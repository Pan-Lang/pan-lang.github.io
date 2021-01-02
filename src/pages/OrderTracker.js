import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { updatePerson } from '../api/People';

import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../firebase';

/**
 * Page with list of people with unfulfilled orders
 */

function OrderTracker() {

  const[snapshot, loading, error] = useCollection(db.collection("people"))
  
  useEffect(() => { 

  })

  function personFulfilled(id) {
    console.log(snapshot.size);
    console.log("trying to fulfill", id);
    const requestBody = {
      //needs name of the person or the ID
      _id: id,
      fulfilled: true
    };
    updatePerson(requestBody);
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
