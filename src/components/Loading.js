import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

/**
 * Centered spinner to signify loading
 */
function Loading() {
  const classes = useStyles();
  return (
    <Container className={classes.spinnerDiv}>
      <CircularProgress />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  spinnerDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default Loading;
