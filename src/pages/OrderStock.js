import React, { useState, useEffect } from 'react';
import StockCard from '../components/StockCard';
import Loading from '../components/Loading';
import { fetchStock } from '../api/Stock';
import LANGUAGES from '../constants/Languages';

function OrderStock({ fromForm, personInfo }) {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [requestedStock, setRequestedStock] = useState([]);

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

  return (
    <div>
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
        {error && <p>Error</p>}
    </div>
  )
}

export default OrderStock;