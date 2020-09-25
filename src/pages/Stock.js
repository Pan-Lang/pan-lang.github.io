import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import fetchStock from '../api/Stock';

function Stock() {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchStock()
      .then((res) => {
        setStock(res.data);
        console.log(res);
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
      {stock && stock.map((item) => <p>{item.name}</p>)}
      {error && <p>Error :(</p>}
      
    </Container>
  );
}

export default Stock;
