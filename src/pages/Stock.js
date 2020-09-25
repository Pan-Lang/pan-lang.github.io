import React, { useEffect, useState } from 'react';
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
    <div>
      <h1>Stock</h1>
      {stock && stock.map((item) => <p>{item.name}</p>)}
      {error && <p>Error :(</p>}
    </div>
  );
}

export default Stock;
