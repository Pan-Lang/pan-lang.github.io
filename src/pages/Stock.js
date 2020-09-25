import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import StockCard from '../components/StockCard';
import StockInput from '../components/StockInput';
import fetchStock from '../api/Stock';

// TODO: move all languages to a more global constant
const LANGUAGES = ['english', 'spanish', 'french', 'mandarin'];

/**
 * Displays the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  useEffect(() => {
    fetchStock()
      .then((res) => {
        setStock(res.data);
      })
      .catch((e) => setError(true));
  }, []);

  return (
    <Container>
      <h1>Stock</h1>
      <Dropdown onChange={(e) => console.log(e)}>
        <Dropdown.Toggle id="dropdown-basic" size="lg">
          Language: {language}
        </Dropdown.Toggle>

        <StockInput />

        <Dropdown.Menu>
          {LANGUAGES.map((lang) => (
            <Dropdown.Item
              onSelect={(key) => setLanguage(key)}
              eventKey={lang}
              key={lang}
            >
              {lang}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {stock.length === 0 && !error && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {stock &&
        stock.map((item) => (
          <StockCard
            stockItem={item}
            lang={language === 'english' ? 'name' : language}
            key={item._id}
          />
        ))}
      {error && <p>Error :(</p>}
    </Container>
  );
}

export default Stock;
