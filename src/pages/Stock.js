import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import StockCard from '../components/StockCard';
import StockInput from '../components/StockInput';
import { fetchStock } from '../api/Stock';
import { Button, Col, Row } from 'react-bootstrap';

// TODO: move all languages to a more global constant
const LANGUAGES = ['english', 'spanish', 'french', 'mandarin'];

/**
 * Displays the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);

  function getStock() {
    setStock([]);
    fetchStock()
      .then((res) => {
        setStock(res.data);
      })
      .catch((e) => setError(true));
  }

  useEffect(() => {
    getStock();
  }, []);

  return (
    <Container>
      <h1>Stock</h1>
      <Row>
        <Col>
          <Dropdown onChange={(e) => console.log(e)}>
            <Dropdown.Toggle id="dropdown-basic" size="md" className="mb-3">
              Language: <b>{language}</b>
            </Dropdown.Toggle>

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
        </Col>
        <Col>
          <Button size="md" onClick={getStock}>
            Refresh
          </Button>
        </Col>
      </Row>

      <StockInput getStock={getStock} />

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
