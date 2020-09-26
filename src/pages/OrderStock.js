import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import { fetchStock } from '../api/Stock';
import LANGUAGES from '../constants/Languages';
import { Container, Dropdown, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

/**
 * Allows user to order stock items only after they've filled out form
 */
function OrderStock() {
  const history = useHistory();
  const location = useLocation();
  const fromForm = location.state !== undefined;
  const personInfo = fromForm ? location.state.personInfo : {};

  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [requestedStockItems, setRequestedStockItems] = useState([]);

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

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /**
   * Callback for OrderModal to add item to items list
   * @param {Object} requestedItem { name, requestedCount } 
   */
  function onRequest(requestedItem) {
    setRequestedStockItems(requestedStockItems.concat(requestedItem));
  }

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>Select stock here</h1>

      {requestedStockItems.map((r) => (
        <p key={r.name}>{r.name}: {r.requestedCount}</p>
      ))}

      <Button className="mb-3" block>Submit request</Button>

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

      {stock.length === 0 && !error && <Loading />}
      {stock &&
        fromForm &&
        stock.map((item) => (
          <OrderCard
            stockItem={item}
            getStock={getStock}
            lang={language === 'english' ? 'name' : language}
            key={item._id}
            onRequest={onRequest}
          />
        ))}
      {error && <p>Error</p>}
    </Container>
  );
}

export default OrderStock;
