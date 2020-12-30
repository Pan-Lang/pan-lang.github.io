import React, { useState, useEffect } from 'react';
import { withFirebase } from '../components/Firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
import { BASE_API_URL } from '../api/Client';
import Dialog from '../components/Dialog'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Button } from 'react-bootstrap';
import { updatePerson } from '../api/People';
/**
 * Page with list of people with unfulfilled orders
 */
function OrderTracker() {

  const[snapshot, loading, error] = useCollection(firebase.firestore().collection('people'))
  
  useEffect(() => { 
    
  })

  function personFulfilled(id) {
    console.log("trying to fulfill", id);
    const requestBody = {
      fulfilled: true
    };
    updatePerson(id, requestBody);
  };

  return (
    <Container>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {snapshot && (
          <span>
            Collection:{' '}
            {snapshot.docs.map(doc=> (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{' '}
                <Button onClick={() => {personFulfilled(doc.id)}}>
                    Fulfill Person
                </Button>
              </React.Fragment>
             
            ))}
          </span>
        )}
      </p>
    </Container>
  );
}

export default OrderTracker;
