import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase';
import { makeStyles } from '@material-ui/core';

function SignIn() {
  const [user, loading, error] = useAuthState(auth);

  function handleSignIn() {
    signInWithGoogle();
  }

  function handleSignOut() {
    auth.signOut();
  }

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h1">
        Join Pan-Lang today.
      </Typography>
      <Button className={classes.button} onClick={handleSignIn}>
        Sign in with Google
      </Button>
      <Button className={classes.button} onClick={handleSignOut}>
        Sign out
      </Button>
      <Typography variant="h3">
        Signed in: {String(Boolean(user))}
      </Typography>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && <ErrorAlert body="An error occurred." />}
      
      {/* Display user info */}
      {Boolean(user) && (
        <Container>
          <Typography>
            Name: {user.displayName}
          </Typography>
          <Typography>
            Email: {user.email}
          </Typography>
          </Container>
      )}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: 'center',
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
  },
}));

export default SignIn;
