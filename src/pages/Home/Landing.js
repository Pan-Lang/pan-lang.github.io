import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import { SIGN_IN } from '../../constants/Routes';
import { makeStyles } from '@material-ui/core';

/**
 * Landing page for Pan-Lang.
 * The first thing people will see when visiting our web app.
 */
function Landing() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h1">Pan-Lang</Typography>
      <Typography variant="h2">
        Helping the language barrier between food pantry coordinators and
        non-English speakers.
      </Typography>
      <Button component={Link} variant="contained" to={SIGN_IN} className={classes.signInLink}>
        Sign up today!
      </Button>

      <br></br><br></br><br></br><br></br><br></br><br></br>
      <Typography variant="h2"><b>The Problem:</b></Typography>
      <br></br>
      <Typography variant="h5" paragraph="true">
        As COVID-19 wreaked havoc on daily life, food pantries were forced 
        to implement new rules to protect the safety of their patrons. 
        But this created much bigger problems: How will pantries quickly manage 
        their stock in the midst of work regulations? How will non-English speaking
        patrons find what they need without entering the pantry?
      </Typography>

      <br></br><br></br><br></br><br></br><br></br><br></br>
      <Typography variant="h2"><b>The Solution:</b></Typography>
      <br></br>
      <Typography variant="h5" paragraph="true">
        In response to this issue within our community, we created Pan-Lang,
        a webapp designed to break language barriers and allow food pantries to
        continue providing their services to families in need.
      </Typography>
      
      <br></br><br></br>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {"Pan-Lang"}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {"Helping the language barrier between food pantry coordinators and non-English speakers."}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          Pan-Lang{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
        </Container>
      </footer>
      <br></br>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
  },
  signInLink: {
    marginTop: theme.spacing(3),
  },
}));

export default Landing;
