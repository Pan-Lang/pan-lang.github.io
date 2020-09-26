import React, { useState, useEffect } from 'react';
import StockCard from '../components/StockCard';
import Loading from '../components/Loading';
import { fetchStock } from '../api/Stock';
import LANGUAGES from '../constants/Languages';
import { Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

function OrderStock() {
  const history = useHistory();
  const location = useLocation();
  const fromForm = location.state !== undefined;
  const personInfo = fromForm ? location.state.personInfo : {};

  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [requestedStock, setRequestedStock] = useState([]);

  useEffect(() => {
    // Send user back to form if they didn't fill it out
    if (!fromForm) {
      history.push('/order');
    } else {
      getStock();
      console.log(personInfo);
    }
  }, [fromForm, history, personInfo]);

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

  return (
    <Container>
      {stock.length === 0 && !error && <Loading />}
      {stock &&
        fromForm &&
        stock.map((item) => (
          <StockCard
            stockItem={item}
            getStock={getStock}
            lang={language === 'english' ? 'name' : language}
            key={item._id}
          />
        ))}
      {error && <p>Error</p>}
    </Container>
  );
}

export default OrderStock;
