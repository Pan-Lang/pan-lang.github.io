import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import StockCard from '../components/StockCard';
import fetchStock from '../api/Stock';
import { Card } from 'react-bootstrap';

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

        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Click here to insert a stock item
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                Form will go here lol
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

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
