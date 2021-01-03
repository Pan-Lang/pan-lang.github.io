import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import Paper from '@material-ui/core/Paper';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signInWithGoogle } from '../firebase';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LANDING } from '../constants/Routes';

function SignIn() {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Redirect user to landing page if already signed in
    if (Boolean(user)) history.push(LANDING);
  }, [history, user])

  function handleSignIn() {
    signInWithGoogle();
  }

  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.page}>
      <Typography variant="h2" className={classes.title}>
        Join Pan-Lang today.
      </Typography>
      <Paper className={classes.paper}>
        {/* Sign in button when not signed in */}
        {!Boolean(user) && (
          <Button className={classes.button} onClick={handleSignIn}>
            Sign in with Google
          </Button>
        )}
      </Paper>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && <ErrorAlert body="An error occurred." />}
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      fontSize: '30px',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(5),
    maxWidth: theme.breakpoints.width('sm'),
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    width: '100%',
    '&:hover': {
      backgroundColor: '#119178',
    },
    marginBottom: theme.spacing(1),
  },
}));

export default SignIn;
