import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import StockCard from '../components/StockCard';
import StockInput from '../components/StockInput';
import { fetchStock } from '../api/Stock';
import { Button } from 'react-bootstrap';
import Loading from '../components/Loading';
import LANGUAGES from '../constants/Languages';

/**
 * Displays the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  function getStock(timeout = 0) {
    // Set stock empty to begin loading spinner
    setStock([]);

    // Fetch stock after designated time
    setTimeout(() => {
      fetchStock()
        .then((res) => {
          setStock(res.data);
        })
        .catch((e) => setError(true));
    }, timeout);
  }

  useEffect(() => {
    getStock();
  }, []);

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
            style={{ backgroundColor: 'green', color: 'white' }}
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
          style={{ backgroundColor: 'green', color: 'white' }}
        >
          Refresh
        </Button>
      </Container>

      <StockInput getStock={getStock} />

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
      {error && <p>An error occurred when loading stock.</p>}
    </Container>
  );
}

export default Stock;
