import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import StockCard from '../components/StockCard';
import StockInput from '../components/StockInput';
import { fetchStock } from '../api/Stock';
import Loading from '../components/Loading';
import LANGUAGES from '../constants/Languages';
import ErrorAlert from '../components/ErrorAlert';
import { makeStyles } from '@material-ui/core';
import LanguageDropdown from '../components/LanguageDropdown';

/**
 * Displays the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(LANGUAGES[0]);

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

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h1" className={classes.title}>
        Stock Dashboard
      </Typography>

      {/* Button bar */}
      <Container className={classes.buttonBar}>
        {/* Language selection */}
        <LanguageDropdown
          languages={LANGUAGES}
          currentLanguage={language}
          buttonClass={classes.button}
          capitalize={capitalize}
          setLanguage={setLanguage}
          isError={error}
        />

        {/* Spacer */}
        <div style={{ margin: 'auto' }} />

        {/* Refresh */}
        <Button size="medium" onClick={getStock} className={classes.button}>
          Refresh
        </Button>
      </Container>

      {/* Stock selection */}
      {Boolean(stock.length) && <StockInput getStock={getStock} />}

      {/* Error */}
      {error && (
        <ErrorAlert
          heading="Error"
          body={`An error occurred while trying to get the stock. ${error}`}
        />
      )}

      {/* Loading spinner */}
      {stock.length === 0 && !error && <Loading />}

      {/* Stock items */}
      {stock &&
        stock.map((item) => (
          <StockCard
            stockItem={item}
            getStock={getStock}
            lang={language === 'english' ? 'name' : language}
            key={item._id}
          />
        ))}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    fontSize: theme.typography.h3.fontSize,
    marginBottom: 3,
  },
  buttonBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    textTransform: 'none',
  },
}));

export default Stock;
