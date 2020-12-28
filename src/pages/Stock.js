import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import AccordionWrapper from '../components/AccordionWrapper';
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import StockCard from '../components/StockCard';
import StockOptions from '../components/StockOptions';
import LANGUAGES from '../constants/Languages';
import { fetchStock } from '../api/Stock';

/**
 * Page displaying the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [nameQuery, setNameQuery] = useState('');
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  /**
   * Fetches stock from API and stores in state
   * @param {Number} timeout ms to wait before fetching stock
   */
  function getStock(timeout = 0) {
    // Set stock empty to begin loading spinner
    setStock([]);
    setError(null);

    // Fetch stock after designated time
    setTimeout(() => {
      fetchStock()
        .then((res) => {
          setStock(res.data);
        })
        .catch((e) => {
          setError(e);
        });
    }, timeout);
  }

  /**
   * Fetch stock as soon as page is rendered
   */
  useEffect(() => {
    getStock();
  }, []);

  /**
   * Capitalizes the first letter of a string
   * @param {String} s string to capitalize
   */
  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Returns filtered stock array based on search queries
   * Name query: allows if EITHER English or translated name includes query
   */
  function getFilteredStockItems() {
    return stock.filter((item) => {
      let inEnglishName = item.name.toLowerCase().includes(nameQuery);
      let inTranslatedName =
        item[language] === undefined
          ? false
          : item[language].toLowerCase().includes(nameQuery);
      return inEnglishName || inTranslatedName;
    });
  }

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
          {isMobile && (
            <AccordionWrapper summary="Options">
              <StockOptions
                languages={LANGUAGES}
                currentLanguage={language}
                setLanguage={setLanguage}
                capitalize={capitalize}
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
                capitalize={capitalize}
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
            <TextField
              className={classes.search}
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
          </Paper>

          {/* Stock items */}
          {stock &&
            getFilteredStockItems().map((item) => (
              <StockCard
                stockItem={item}
                getStock={getStock}
                // Key of English name is always 'name'
                lang={language === 'english' ? 'name' : language}
                key={item.name}
              />
            ))}

          {/* Loading spinner */}
          {stock.length === 0 && !error && <Loading />}

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
}));

export default Stock;
