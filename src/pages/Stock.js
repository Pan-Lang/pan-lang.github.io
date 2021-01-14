import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Material UI imports */
import Box from '@material-ui/core/Box';
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
import ErrorAlert from '../components/ErrorAlert';
import Loading from '../components/Loading';
import StockCard from '../components/StockCard';
import StockOptions from '../components/StockOptions';

/** Constants, Firebase, API */
import LANGUAGES from '../constants/Languages';
import { LANDING } from '../constants/Routes';
import { auth } from '../firebase';
import useStock from '../hooks/useStock';

/**
 * Page displaying the stock of food pantry with options for language
 */
function Stock() {
  const [stock, loading, error, getStock] = useStock();
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [nameQuery, setNameQuery] = useState('');
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
