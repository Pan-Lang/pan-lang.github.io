import React, { useState, useEffect } from 'react';
import { withFirebase } from '../Firebase';
import Container from 'react-bootstrap/Container';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
import { BASE_API_URL } from '../api/Client';
import Dialog from '../components/Dialog'

/**
 * Page with list of people with unfulfilled orders
 */
function OrderTracker() {

  const[value, loading, error] = useCollection(firebase.firestore().collection('people'))
  
  useEffect(() => {
    const unsubscribe = firebase.firestore()
  })

  function personFulfilled(id) {

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ person: id, fulfilled: true})
    };

    
  }
  return (
    <Container>
      {ordersList.length === 0 && <Dialog/>}
      {ordersList &&
        ordersList.map((order) => (
          <UnfulfilledOrderCard
            fulfillPerson={personFulfilled}
            person={order}
            key={order._id}
          />
        ))}
    </Container>
  );
}

export default withFirebase(OrderTracker);
