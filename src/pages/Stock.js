import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Material UI imports */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

/** Component imports */
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import StockCard from '../components/StockCard';
import SearchBar from '../components/SearchBar';

/** Constants, Firebase, API */
import LANGUAGES from '../constants/Languages';
import { LANDING } from '../constants/Routes';
import { auth } from '../firebase';

/** Custom hooks */
import useStock from '../hooks/useStock';
import useNameSearch from '../hooks/useNameSearch';
import StockInput from '../components/StockInput';

/**
 * Page displaying the stock of food pantry with options for language
 */
function Stock() {
  const [stock, loading, error, getStock] = useStock();
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [setNameQuery, getFilteredStockItems] = useNameSearch(
    stock,
    language.tag
  );
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const history = useHistory();

  /**
   * Fetch stock as soon as page is rendered, if user is signed in
   */
  useEffect(() => {
    if (!Boolean(auth.currentUser)) {
      history.push(LANDING);
    }
  }, [history]);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.title}>
        Stock Dashboard
      </Typography>

      {/* Two column desktop layout, one column mobile layout */}
      <Grid container spacing={isMobile ? 0 : 2}>
        {/* Left column */}
        <Grid item xs={12} md={4}>
          {/* On mobile: hide options in accordion */}
          {isMobile && <StockInput getStock={getStock} />}

          {/* On desktop: keep options bar open */}
          {!isMobile && (
            <Paper elevation={2} className={classes.column}>
              <Typography variant="h5" className={classes.subheading}>
                Options
              </Typography>
              <StockInput getStock={getStock} defaultExpanded={true} />
            </Paper>
          )}
        </Grid>

        {/* Right column */}
        <Grid item xs={12} md={8}>
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
            getFilteredStockItems().map((item) => (
              <StockCard
                stockItem={item}
                getStock={getStock}
                // Key of English name is always 'name'
                languageTag={language.tag}
                key={item.name}
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
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
    flexGrow: 1,
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

export default Stock;
