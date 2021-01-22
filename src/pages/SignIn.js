import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Loading from '../components/Loading';
import ErrorAlert from '../components/ErrorAlert';
import Paper from '@material-ui/core/Paper';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  signInWithFacebook,
  signInWithGoogle,
  signInWithYahoo,
} from '../firebase';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { LANDING } from '../constants/Routes';
import logo from '../images/logo_nobg.png';
import Footer from '../components/Footer';

/**
 * Sign in page for Pan-Lang
 */
function SignIn() {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Redirect user to landing page if already signed in
    if (Boolean(user)) history.push(LANDING);
  }, [history, user]);

  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.page}>
      {/* Logo */}
      <img src={logo} alt="Pan-Lang logo" style={{ width: 120, height: 120 }} />

      <Typography variant="h2" className={classes.title}>
        Join Pan-Lang today.
      </Typography>

      <Paper className={classes.paper}>
        {/* Sign in buttons */}
        <Button className={classes.button} onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
        <Button className={classes.button} onClick={signInWithFacebook}>
          Sign in with Facebook
        </Button>
        <Button className={classes.button} onClick={signInWithYahoo}>
          Sign in with Yahoo
        </Button>
      </Paper>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && <ErrorAlert body="An error occurred." />}

      <Footer />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    marginTop: 110,
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default SignIn;
