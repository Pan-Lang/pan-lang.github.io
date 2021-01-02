import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { updatePerson } from '../api/People';

import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from "firebase/app";
import "firebase/firestore";


/**
 * Page with list of people with unfulfilled orders
 */

 const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.MEASUREMENT_ID
 }

 firebase.initializeApp(firebaseConfig);
function OrderTracker() {

  const[snapshot, loading, error] = useCollection(firebase.firestore().collection("people"))
  
  useEffect(() => { 
  })

  function personFulfilled(id) {
    console.log(snapshot.size);
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
