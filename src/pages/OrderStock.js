import React, { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Loading from '../components/Loading';
import { fetchStock } from '../api/Stock';
import LANGUAGES from '../constants/Languages';
import { Container, Dropdown, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { addPersonInfo } from '../api/People';
import { updateStockCount } from '../api/Stock';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorAlert from '../components/ErrorAlert';

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
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setError(false);

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
   * @param {Object} requestedItem { id, name, requestedCount, countAfterRequest }
   */
  function onRequest(requestedItem) {
    // Check if item is already in list
    let alreadyRequested = requestedStockItems.find(
      (item) => item.id === requestedItem.id
    );

    // If item is already in list, update its values instead of adding
    if (alreadyRequested === undefined) {
      setRequestedStockItems(requestedStockItems.concat(requestedItem));
    } else {
      let itemIndex = requestedStockItems.indexOf(alreadyRequested);

      let updatedStockItems = [...requestedStockItems];
      updatedStockItems[itemIndex].requestedCount =
        requestedItem.requestedCount;
      updatedStockItems[itemIndex].countAfterRequest =
        requestedItem.countAfterRequest;

      setRequestedStockItems(updatedStockItems);
    }
  }

  function writeRequestToNotes() {
    let orderNotes = '';
    requestedStockItems.forEach((item) => {
      orderNotes += item.name + ': ' + item.requestedCount + ', ';
    });
    return orderNotes.slice(0, -2);
  }

  function submitRequest() {
    // Send full person info to API
    const requestBody = {
      firstname: personInfo.firstName,
      lastname: personInfo.lastName,
      adults: personInfo.adults,
      children: personInfo.adults,
      zipcode: personInfo.zipcode,
      'order-notes': writeRequestToNotes(),
      fulfilled: false,
    };
    addPersonInfo(requestBody);

    // Send updates for each requested item to API
    const stockUpdatePromises = requestedStockItems.map((item) => {
      console.log('making promise... ', item.countAfterRequest);
      return updateStockCount(item.id, { newCount: item.countAfterRequest });
    });

    Promise.all(stockUpdatePromises).then((responses) =>
      console.log(responses)
    );

    // Show confirmation popup
    setShowConfirmation(true);
  }

  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Select stock here</h1>

      {requestedStockItems.map((r) => (
        <p key={r.name}>
          {r.name}: {r.requestedCount}
        </p>
      ))}

      {!error && (
        <Button
          variant="type"
          className="mb-3"
          onClick={submitRequest}
          block
          style={{backgroundColor: '#16AB8D', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}}
          disabled={requestedStockItems.length === 0}
        >
          {requestedStockItems.length > 0
            ? 'Submit request'
            : 'Select items below'}
        </Button>
      )}

      <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <Dropdown variant="type" onChange={(e) => console.log(e)}>
          <Dropdown.Toggle
            variant="type"
            id="dropdown-basic"
            size="md"
            className="mb-3"
            style={{backgroundColor: '#16AB8D', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}}
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
          style={{backgroundColor: '#16AB8D', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}}
        >
          Refresh
        </Button>
      </Container>

      {/* List of stock */}
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
            isRequested={requestedStockItems.some(
              (requested) => item._id === requested.id
            )}
          />
        ))}
      {error && (
        <ErrorAlert
          heading="Error"
          body="An error occurred while trying to get the stock."
          dismissible={false}
        />
      )}

      {/* Confirmation popup */}
      <ConfirmationModal
        style={{backgroundColor: '#16AB8D', borderColor: '#16AB8D', color: '#FFFFFF'}}
        title="Order successfully placed!"
        body="Thanks for your patronage! Your order will be fulfilled shortly."
        buttonText="Back to Home"
        show={showConfirmation}
        handleClose={() => {
          setShowConfirmation(false);
          history.push('/'); // Redirect back home
        }}
      />
    </Container>
  );
}

export default OrderStock;
