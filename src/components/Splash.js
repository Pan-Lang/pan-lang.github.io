import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

/**
 * Full screen component shown when loading authentication
 */
function Splash({ loading = true }) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <img
        src={require('../images/logo_nobg.png')}
        alt="Pan-Lang logo"
        className={classes.logo}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    maxWidth: '90vw',
  },
}));

export default Splash;
