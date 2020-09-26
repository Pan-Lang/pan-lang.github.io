import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Container from 'react-bootstrap/Container';
import Loading from '../components/Loading';
import { useHistory } from 'react-router-dom';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
const ENDPOINT = 'http://localhost:3000'; //needs to be changed to heroku after testing

// List of people with unfulfilled orders
let listPeople = [];

/**
 * Page with list of people with unfulfilled orders
 */
function OrderTrackerPage() {
  const history = useHistory();
  const [response, setResponse] = useState(listPeople);
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on('person', (data) => {
      eventHandler(data);
    });

    const eventHandler = (data) => {
      listPeople = listPeople.concat(data);
      setResponse(listPeople);
    };

    return () => {
      console.log('effect done');
      socket.off('person', eventHandler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function personFulfilled(id) {
    socket.emit('personFulfilled', id);
    // Refresh the page after emitting fulfillment
    history.go(0);
  }

  return (
    <Container>
      {listPeople.length === 0 && <Loading />}
      {response &&
        response.map((person) => (
          <UnfulfilledOrderCard
            fulfillPerson={personFulfilled}
            person={person}
            key={person._id}
          />
        ))}
    </Container>
  );
}

export default OrderTrackerPage;