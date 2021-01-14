import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import ConfirmationModal from '../components/ConfirmationModal';
import LanguageMenu from '../components/LanguageMenu';
import Loading from '../components/Loading';
import StockOrderCard from '../components/StockOrderCard';
import { fetchStock } from '../api/Stock';
import LANGUAGES from '../constants/Languages';
import { addPersonInfo } from '../api/People';
import { updateStockCount } from '../api/Stock';
import ErrorAlert from '../components/ErrorAlert';
import { auth } from '../firebase';
import { LANDING, ORDER_FORM } from '../constants/Routes';

/**
 * Allows user to order stock items only after they've filled out form
 */
function OrderStock() {
  const history = useHistory();
  const location = useLocation();
  const fromForm = location.state !== undefined;

  const [stock, setStock] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [personInfo] = useState(
    fromForm
      ? location.state.personInfo
      : retrieveFromStorage('personInfo', undefined)
  );
  const [requestedStockItems, setRequestedStockItems] = useState(
    retrieveFromStorage('requestedStockItems', [])
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (!Boolean(auth.currentUser)) {
      // Send user back to homepage if not signed in
      history.push(LANDING);
    } else if (!personInfo) {
      // Send user back to form if they didn't fill it out
      history.push(ORDER_FORM);
    } else {
      localStorage.setItem('personInfo', JSON.stringify(personInfo));
      getStock();
      console.log(personInfo);
    }
  }, [fromForm, history, personInfo]);

  function retrieveFromStorage(key, defaultValue) {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    } else {
      return defaultValue;
    }
  }

  function getStock(timeout = 0) {
    // Set stock empty to begin loading spinner
    setStock([]);
    setError(false);
    setLoading(true);

    // Fetch stock after designated time
    setTimeout(() => {
      fetchStock(auth.currentUser.uid)
        .then((res) => {
          setStock(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setError(true);
        });
    }, timeout);
  }

  /**
   * Callback for OrderModal to add item to items list
   * @param {{
   *  id: String,
   *  name: String,
   *  requestedCount: Number,
   *  countAfterRequest: Number }} requestedItem
   */
  function onRequest(requestedItem) {
    // Check if item is already in list
    let alreadyRequested = requestedStockItems.find(
      (item) => item.id === requestedItem.id
    );

    let updatedRequestedItems;

    if (alreadyRequested === undefined) {
      // If item isn't in list, simply add it
      updatedRequestedItems = requestedStockItems.concat(requestedItem);
    } else {
      // If item is already in list, update its values instead of adding
      let itemIndex = requestedStockItems.indexOf(alreadyRequested);

      updatedRequestedItems = [...requestedStockItems];

      // Replace old values with new values
      updatedRequestedItems[itemIndex].requestedCount =
        requestedItem.requestedCount;
      updatedRequestedItems[itemIndex].countAfterRequest =
        requestedItem.countAfterRequest;
    }

    // Update state and local storage
    setRequestedStockItems(updatedRequestedItems);
    localStorage.setItem(
      'requestedStockItems',
      JSON.stringify(updatedRequestedItems)
    );
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
      pantry: auth.currentUser.uid,
      firstName: personInfo.firstName,
      lastName: personInfo.lastName,
      adults: parseInt(personInfo.adults),
      children: parseInt(personInfo.adults),
      zipcode: personInfo.zipcode,
      'order-notes': writeRequestToNotes(),
      fulfilled: false,
    };
    addPersonInfo(requestBody);

    // Send updates for each requested item to API
    const stockUpdatePromises = requestedStockItems.map((item) => {
      console.log(
        'making promise... ',
        item.countAfterRequest,
        auth.currentUser.uid
      );
      let body = {
        pantry: auth.currentUser.uid,
        _id: item.id,
        newCount: item.countAfterRequest,
      };

      return updateStockCount(body);
    });

    Promise.all(stockUpdatePromises).then((responses) =>
      console.log(responses)
    );

    // Clear local storage
    localStorage.removeItem('requestedStockItems');
    localStorage.removeItem('personInfo');

    // Show confirmation popup
    setShowConfirmation(true);
  }

  /**
   * Gets the requested count of a stock item, or 0 if not requested
   * @param {String} itemId id of requested stock item
   */
  function getRequestedCount(itemId) {
    let requestedItem = requestedStockItems.find((item) => item.id === itemId);
    if (Boolean(requestedItem)) {
      return requestedItem.requestedCount;
    } else {
      return 0;
    }
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
          style={{
            backgroundColor: '#16AB8D',
            borderColor: '#FFFFF5',
            color: '#FFFFFF',
            borderRadius: '200px',
          }}
          disabled={requestedStockItems.length === 0}
        >
          {requestedStockItems.length > 0
            ? 'Submit request'
            : 'Select items below'}
        </Button>
      )}

      <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <LanguageMenu
          languages={LANGUAGES}
          currentLanguage={language}
          setLanguage={setLanguage}
          isError={error}
          buttonClass={{
            backgroundColor: '#16AB8D',
            borderColor: '#FFFFF5',
            color: '#FFFFFF',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#119178',
            },
            width: '100%',
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <div style={{ margin: 'auto' }} />
        <Button
          variant="type"
          size="md"
          onClick={getStock}
          style={{
            backgroundColor: '#16AB8D',
            borderColor: '#FFFFF5',
            color: '#FFFFFF',
            borderRadius: '200px',
          }}
        >
          Refresh
        </Button>
      </Container>

      {/* List of stock */}
      {loading && <Loading />}
      {stock &&
        personInfo &&
        stock.map((item) => (
          <StockOrderCard
            stockItem={item}
            getStock={getStock}
            languageTag={language.tag}
            key={item._id}
            onRequest={onRequest}
            requestedCount={getRequestedCount(item._id)}
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
        style={{
          backgroundColor: '#16AB8D',
          borderColor: '#16AB8D',
          color: '#FFFFFF',
        }}
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
