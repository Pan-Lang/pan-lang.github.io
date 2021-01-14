import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/** Material UI Imports */
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import RefreshIcon from '@material-ui/icons/Refresh';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

/** Component imports */
import AccordionWrapper from '../components/AccordionWrapper';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import StockOrderCard from '../components/StockOrderCard';
import StockOptions from '../components/StockOptions';

/** Constants, API, Firebase */
import LANGUAGES from '../constants/Languages';
import { LANDING, ORDER_FORM } from '../constants/Routes';
import { addPersonInfo } from '../api/People';
import { updateStockCount } from '../api/Stock';
import { auth } from '../firebase';
import useStock from '../hooks/useStock';

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
  const [nameQuery, setNameQuery] = useState('');
  const [personInfo] = useState(
    fromForm
      ? location.state.personInfo
      : retrieveFromStorage('personInfo', undefined)
  );
  const [requestedStockItems, setRequestedStockItems] = useState(
    retrieveFromStorage('requestedStockItems', [])
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!Boolean(auth.currentUser)) {
      // Send user back to homepage if not signed in
      history.push(LANDING);
    } else if (!personInfo) {
      // Send user back to form if they didn't fill it out
      history.push(ORDER_FORM);
    } else {
      localStorage.setItem('personInfo', JSON.stringify(personInfo));
      console.log(personInfo);
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

  function writeRequestToNotes() {
    let orderNotes = '';
    requestedStockItems.forEach((item) => {
      orderNotes += item.name + ': ' + item.requestedCount + ', ';
    });
    return orderNotes.slice(0, -2);
  }

  function submitRequest() {
    // Send full person info to API
    const requestBody = {
      pantry: auth.currentUser.uid,
      firstName: personInfo.firstName,
      lastName: personInfo.lastName,
      adults: parseInt(personInfo.adults),
      children: parseInt(personInfo.adults),
      zipcode: personInfo.zipcode,
      'order-notes': writeRequestToNotes(),
      fulfilled: false,
    };
    addPersonInfo(requestBody);

    // Send updates for each requested item to API
    const stockUpdatePromises = requestedStockItems.map((item) => {
      console.log(
        'making promise... ',
        item.countAfterRequest,
        auth.currentUser.uid
      );
      let body = {
        pantry: auth.currentUser.uid,
        _id: item.id,
        newCount: item.countAfterRequest,
      };

      return updateStockCount(body);
    });

    Promise.all(stockUpdatePromises).then((responses) =>
      console.log(responses)
    );

    // Clear local storage
    localStorage.removeItem('requestedStockItems');
    localStorage.removeItem('personInfo');

    // Show confirmation popup
    setShowConfirmation(true);
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

  /**
   * Returns filtered stock array based on search queries
   * Name query: allows if EITHER English or translated name includes query
   */
  function getFilteredStockItems() {
    return stock.filter((item) => {
      // Check if query is included in English name
      const inEnglishName = item.name.toLowerCase().includes(nameQuery);

      let inTranslatedName = false;

      // Check first if translations have loaded
      let translations = item.translations;
      if (Boolean(translations) && translations[language.tag] !== undefined) {
        // Check if query is included in translated name
        inTranslatedName = item.translations[language.tag]
          .toLowerCase()
          .includes(nameQuery);
      }
      return inEnglishName || inTranslatedName;
    });
  }

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Select order for {personInfo.firstName} {personInfo.lastName}
      </Typography>

      {requestedStockItems.map((r) => (
        <Typography key={r.name}>
          {r.name}: {r.requestedCount}
        </Typography>
      ))}

      <Button
        fullWidth
        onClick={submitRequest}
        disabled={requestedStockItems.length === 0}
        variant="contained"
      >
        {requestedStockItems.length > 0
          ? 'Submit request'
          : 'Select items below'}
      </Button>

      {/* Two column desktop layout, one column mobile layout */}
      <Grid container spacing={isMobile ? 0 : 2}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          {/* On mobile: hide options in accordion */}
          {isMobile && (
            <AccordionWrapper summary="Options">
              <StockOptions
                languages={LANGUAGES}
                currentLanguage={language}
                setLanguage={setLanguage}
                getStock={getStock}
                isError={error}
              />
            </AccordionWrapper>
          )}

          {/* On desktop: keep options bar open */}
          {!isMobile && (
            <Paper elevation={2} className={classes.column}>
              <Typography variant="h5" className={classes.subheading}>
                Options
              </Typography>
              <StockOptions
                languages={LANGUAGES}
                currentLanguage={language}
                setLanguage={setLanguage}
                getStock={getStock}
                isError={error}
              />
            </Paper>
          )}
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
          {/* Search bar */}
          <Paper elevation={1} className={classes.searchPaper}>
            <Box display="flex" alignItems="stretch">
              {/* Search bar */}
              <TextField
                className={classes.search}
                type="search"
                id="searchbar"
                label="Search items"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                onChange={(event) =>
                  setNameQuery(event.target.value.toLowerCase())
                }
              />

              {/* Refresh button */}
              <IconButton size="medium" color="primary" onClick={getStock}>
                <RefreshIcon />
              </IconButton>
            </Box>

            {/* Basic stock info */}
            {!loading && !error && (
              <Typography className={classes.info}>
                Showing {getFilteredStockItems().length} of {stock.length} total
                items
              </Typography>
            )}
          </Paper>

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

      {/* Confirmation popup */}
      <ConfirmationModal
        style={{
          backgroundColor: '#16AB8D',
          borderColor: '#16AB8D',
          color: '#FFFFFF',
        }}
        title="Order successfully placed!"
        body="Thanks for your patronage! Your order will be fulfilled shortly."
        buttonText="Back to Home"
        show={showConfirmation}
        handleClose={() => {
          setShowConfirmation(false);
          history.push('/'); // Redirect back home
        }}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export default OrderStock;
