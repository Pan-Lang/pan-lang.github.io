import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { updatePerson } from '../api/People';
import { useHistory } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db, auth } from '../firebase';
import { LANDING } from '../constants/Routes';

/**
 * Page with list of people with unfulfilled orders
 */

function OrderTracker() {

  const history = useHistory();
  const[user, loading_user, error_user] = useAuthState(auth);
  const[query, setQuery] = useState();

  useEffect(() => { 
    if (!Boolean(user)) {
      history.push(LANDING);
    } else {
      setQuery(db.collection("pantries").doc(user.uid).collection("people").where("fulfilled", "==", false));
      console.log(user.uid)
      //I want to update the react hook in here so that we can actually use user.email and the refresh works
    }
  }, [history, user])

  const[snapshot, loading_snap, error_snap] = useCollection(query)
               
  //TODO: make it so that it only shows the ones with fulfilled:false
  function personFulfilled(id) {
    console.log(snapshot.size);
    console.log("trying to fulfill", id);
    const requestBody = {
      //needs name of the person or the ID
      pantry: user.uid, //this will eventually be user.email
      _id: id,
      fulfilled: true
    };
    updatePerson(requestBody);
  };

  return (
    <Container>
      <p>
        {error_snap && <strong>Error: {JSON.stringify(error_snap)}</strong>}
        {loading_snap && <span>Collection: Loading...</span>}
        {snapshot && (
          <span>
            Collection:{' '}
            {snapshot.docs.map(doc => (
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
