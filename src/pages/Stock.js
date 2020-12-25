import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import StockCard from '../components/StockCard';
import StockInput from '../components/StockInput';
import { fetchStock } from '../api/Stock';
import { Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import LANGUAGES from '../constants/Languages';
import ErrorAlert from '../components/ErrorAlert';

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

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Stock</h1>
      <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <Dropdown onChange={(e) => console.log(e)}>
          <Dropdown.Toggle
            variant="type"
            id="dropdown-basic"
            size="md"
            className="mb-3"
            style={{
              backgroundColor: '#16AB8D',
              borderColor: '#FFFFF5',
              color: '#FFFFFF',
              borderRadius: '200px',
            }}
          >
            Language: <b>{capitalize(language)}</b>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {LANGUAGES.map((lang) => (
              <Dropdown.Item
                onSelect={(key) => setLanguage(key)}
                eventKey={lang}
                key={lang}
              >
                {capitalize(lang)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ margin: 'auto' }} />
        <Button
          variant="type"
          size="md"
          onClick={getStock}
          style={{
            backgroundColor: '#16AB8D',
            borderColor: '#FFFFF5',
            color: '#FFFFFF',
            borderRadius: '200px',
          }}
        >
          Refresh
        </Button>
      </Container>

      {!error && <StockInput getStock={getStock} />}

      {error && (
        <ErrorAlert
          heading="Error"
          body={`An error occurred while trying to get the stock. ${error}`}
        />
      )}
      {stock.length === 0 && !error && <Loading />}
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

export default Stock;
