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
