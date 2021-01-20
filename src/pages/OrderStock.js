import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/** Material UI Imports */
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

/** Component imports */
import AccordionWrapper from '../components/AccordionWrapper';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import StockOrderCard from '../components/StockOrderCard';
import SearchBar from '../components/SearchBar';
import RequestedItemCard from '../components/RequestedItemCard';
import ReviewDialog from '../components/ReviewDialog';

/** Constants, API, Firebase */
import LANGUAGES from '../constants/Languages';
import { LANDING, ORDER_FORM } from '../constants/Routes';
import { ORDER_STEPS } from '../constants/Order';
import { addPersonInfo } from '../api/People';
import { updateStockCount } from '../api/Stock';
import { auth } from '../firebase';

/** Custom hooks */
import useStock from '../hooks/useStock';
import useNameSearch from '../hooks/useNameSearch';

/**
 * Allows user to order stock items only after they've filled out form
 */
function OrderStock() {
  const history = useHistory();
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const location = useLocation();
  const fromForm = location.state !== undefined;

  const [stock, loading, error, getStock] = useStock();
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [setNameQuery, getFilteredStockItems] = useNameSearch(
    stock,
    language.tag
  );
  const [showReview, setShowReview] = useState(false);

  // Patron info from order form page, kept in local storage if necessary
  const [personInfo] = useState(
    fromForm
      ? location.state.personInfo
      : retrieveFromStorage('personInfo', undefined)
  );

  // List of requested items, kept in lcoal storage if necessary
  const [requestedStockItems, setRequestedStockItems] = useState(
    retrieveFromStorage('requestedStockItems', [])
  );

  useEffect(() => {
    if (!Boolean(auth.currentUser)) {
      // Send user back to homepage if not signed in
      history.push(LANDING);
    } else if (!personInfo) {
      // Send user back to form if they didn't fill it out
      history.push(ORDER_FORM);
    } else {
      localStorage.setItem('personInfo', JSON.stringify(personInfo));
    }
  }, [fromForm, history, personInfo]);

  function retrieveFromStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return defaultValue;
    }
  }

  /**
   * Callback for OrderModal to add item to items list
   * @param {{
   *  id: String,
   *  name: String,
   *  requestedCount: Number,
   *  countAfterRequest: Number }} requestedItem
   */
  function onRequest(requestedItem) {
    // Check if item is already in list
    let alreadyRequested = requestedStockItems.find(
      (item) => item.id === requestedItem.id
    );

    let updatedRequestedItems;

    if (alreadyRequested === undefined) {
      // If item isn't in list, simply add it
      updatedRequestedItems = requestedStockItems.concat(requestedItem);
    } else {
      // If item is already in list, update its values instead of adding
      let itemIndex = requestedStockItems.indexOf(alreadyRequested);

      updatedRequestedItems = [...requestedStockItems];

      // Replace old values with new values
      updatedRequestedItems[itemIndex].requestedCount =
        requestedItem.requestedCount;
      updatedRequestedItems[itemIndex].countAfterRequest =
        requestedItem.countAfterRequest;
    }

    // Update state and local storage
    setRequestedStockItems(updatedRequestedItems);
    localStorage.setItem(
      'requestedStockItems',
      JSON.stringify(updatedRequestedItems)
    );
  }

  /**
   * Removes a requested item from list, if present
   * @param requestedItem item in order to remove
   */
  function removeRequestedItem(requestedItem) {
    const index = requestedStockItems.indexOf(requestedItem);
    if (index > -1) {
      const updatedRequest = [...requestedStockItems];
      updatedRequest.splice(index, 1);
      setRequestedStockItems(updatedRequest);
      // TODO: update local storage
    }
  }

  function writeRequestToNotes() {
    let orderNotes = '';
    requestedStockItems.forEach((item) => {
      orderNotes += item.name + ': ' + item.requestedCount + ', ';
    });
    return orderNotes.slice(0, -2);
  }

  async function submitRequest(additionalNotes) {
    // Send full person info to API
    const requestBody = {
      pantry: auth.currentUser.uid,
      firstName: personInfo.firstName,
      lastName: personInfo.lastName,
      adults: parseInt(personInfo.adults),
      children: parseInt(personInfo.children),
      zipcode: personInfo.zipcode,
      'order-notes': writeRequestToNotes(),
      additionalNotes: additionalNotes,
      fulfilled: false,
    };

    await addPersonInfo(requestBody);

    // Send updates for each requested item to API
    const stockUpdatePromises = requestedStockItems.map((item) => {
      let body = {
        pantry: auth.currentUser.uid,
        _id: item.id,
        newCount: item.countAfterRequest,
      };

      return updateStockCount(body);
    });

    // TODO: handle case where some update doesn't go through
    // Make sure all updates are good
    await Promise.all(stockUpdatePromises);

    // Clear local storage
    localStorage.removeItem('requestedStockItems');
    localStorage.removeItem('personInfo');

    return true;
  }

  /**
   * Gets the requested count of a stock item, or 0 if not requested
   * @param {String} itemId id of requested stock item
   */
  function getRequestedCount(itemId) {
    let requestedItem = requestedStockItems.find((item) => item.id === itemId);
    if (Boolean(requestedItem)) {
      return requestedItem.requestedCount;
    } else {
      return 0;
    }
  }

  const classes = useStyles();
  const orderTitle = `Review order (${requestedStockItems.length})`;
  const buttonText =
    requestedStockItems.length > 0 ? 'Review order' : 'Select items';
  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Select order for {personInfo.firstName} {personInfo.lastName}
      </Typography>

      <Stepper
        activeStep={showReview ? 2 : 1}
        className={classes.stepper}
        alternativeLabel
      >
        {ORDER_STEPS.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Two column desktop layout, one column mobile layout */}
      <Grid container spacing={isMobile ? 1 : 2}>
        {/* Left column */}
        <Grid item xs={12} md={5}>
          {/* On mobile: hide order in accordion */}
          {isMobile && (
            <AccordionWrapper
              summary={
                <Badge
                  badgeContent={requestedStockItems.length}
                  color="secondary"
                >
                  {'Review Order Here'}
                </Badge>
              }
              usePrimary={requestedStockItems.length > 0}
            >
              {/* Requested items */}
              {requestedStockItems.map((r) => (
                <RequestedItemCard
                  requestedItem={r}
                  onRequest={onRequest}
                  removeRequestedItem={removeRequestedItem}
                  key={r.id}
                />
              ))}

              {/* Submit button */}
              <Button
                fullWidth
                onClick={() => setShowReview(true)}
                disabled={requestedStockItems.length === 0}
                variant="contained"
                color="primary"
              >
                {buttonText}
              </Button>
            </AccordionWrapper>
          )}

          {/* On desktop: keep order open */}
          {!isMobile && (
            <Paper elevation={2} className={classes.column}>
              {/* Title */}
              <Typography variant="h5" className={classes.subheading}>
                {orderTitle}
              </Typography>

              {/* Requested items */}
              {requestedStockItems.map((r) => (
                <RequestedItemCard
                  requestedItem={r}
                  onRequest={onRequest}
                  removeRequestedItem={removeRequestedItem}
                  key={r.id}
                />
              ))}

              {/* Submit button */}
              <Button
                fullWidth
                onClick={() => setShowReview(true)}
                disabled={requestedStockItems.length === 0}
                variant="contained"
                color="primary"
              >
                {buttonText}
              </Button>
            </Paper>
          )}
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={7}>
          {/* Search bar */}
          <SearchBar
            LANGUAGES={LANGUAGES}
            stock={stock}
            getFilteredStockItems={getFilteredStockItems}
            error={error}
            getStock={getStock}
            language={language}
            setLanguage={setLanguage}
            setNameQuery={setNameQuery}
          />

          {/* Stock items */}
          {stock &&
            personInfo &&
            getFilteredStockItems().map((item) => (
              <StockOrderCard
                stockItem={item}
                getStock={getStock}
                languageTag={language.tag}
                key={item._id}
                onRequest={onRequest}
                requestedCount={getRequestedCount(item._id)}
              />
            ))}

          {/* Alert when no stock is found */}
          {!loading && !error && stock.length === 0 && (
            <ErrorAlert
              severity="info"
              body="No stock items found. Insert one in the Options menu!"
            />
          )}

          {/* Loading spinner */}
          {loading && <Loading />}

          {/* Error alert */}
          {error && (
            <ErrorAlert
              heading="Error"
              body={`An error occurred while trying to get the stock. ${error}`}
            />
          )}
        </Grid>
      </Grid>

      {/* Review popup */}
      <ReviewDialog
        show={showReview}
        handleClose={() => {
          setShowReview(false);
        }}
        requestedStockItems={requestedStockItems}
        personInfo={personInfo}
        submitRequest={submitRequest}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
    [theme.breakpoints.only('xs')]: {
      paddingLeft: 2,
      paddingRight: 2,
    },
  },
  title: {
    textAlign: 'center',
    fontSize: theme.typography.h3.fontSize,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.h4.fontSize,
    },
    marginBottom: theme.spacing(2),
  },
  subheading: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  column: {
    padding: theme.spacing(2),
  },
  searchPaper: {
    margin: 5,
    padding: theme.spacing(2),
  },
  search: {
    width: '95%',
  },
  details: {
    display: 'block',
  },
  info: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  stepper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: theme.breakpoints.values.sm,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
}));

export default OrderStock;
