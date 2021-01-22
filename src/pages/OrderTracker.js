import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { updatePerson } from '../api/People';
import { useHistory } from 'react-router-dom';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';
import { LANDING } from '../constants/Routes';
import UnfulfilledOrderCard from '../components/UnfulfilledOrderCard';
import Loading from '../components/Loading';
import Dialog from '../components/EmptyDialog';
import { makeStyles } from '@material-ui/core';

/**
 * Page with list of people with unfulfilled orders
 */
function OrderTracker() {
  const history = useHistory();
  const [user, userLoading, userError] = useAuthState(auth);
  const [query, setQuery] = useState();

  useEffect(() => {
    if (!Boolean(user)) {
      // If user is not logged in, redirect to home screen
      history.push(LANDING);
    } else {
      // If user is logged in, fetch their orders
      setQuery(
        db
          .collection('pantries')
          .doc(user.uid)
          .collection('people')
          .where('fulfilled', '==', false)
      );
    }
  }, [history, user]);

  const [snapshot, snapLoading, snapError] = useCollection(query);

  function fulfillOrder(id) {
    const requestBody = {
      pantry: user.uid,
      _id: id,
      fulfilled: true,
    };
    updatePerson(requestBody);
  }

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {userError && <strong>User Error: {JSON.stringify(snapError)}</strong>}
      {userLoading && <span>User: Loading...</span>}
      {snapError && (
        <strong>Collection Error: {JSON.stringify(snapError)}</strong>
      )}
      {snapLoading && <Loading />}
      {snapshot && snapshot.docs.length === 0 && <Dialog />}
      {snapshot &&
        snapshot.docs.map((doc) => (
          <UnfulfilledOrderCard
            person={doc.data()}
            id={doc.id}
            fulfillPerson={fulfillOrder}
            key={doc._id}
          />
        ))}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
  },
}));

export default OrderTracker;
