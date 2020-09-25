import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import StockCard from '../components/StockCard';
import fetchStock from '../api/Stock';

/**
 * Displays the stock of food pantry with options for language
 */
function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);

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
      {stock.length === 0 && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {stock &&
        stock.map((item) => <StockCard stockItem={item} key={item._id} />)}
      {error && <p>Error :(</p>}
    </Container>
  );
}

export default Stock;
