import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import CsvModal from '../../components/CSVModal';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { ORDER_FORM, STOCK } from '../../constants/Routes';

/**
 * User's home page for Pan-Lang.
 * The default screen for users logged in to Pan-Lang.
 */
function User() {
  const [showCSVModal, setShowCSVModal] = useState(false);

  // Handlers for showing/closing modal when downloading csv
  const handleClose = () => setShowCSVModal(false);
  const handleShow = () => setShowCSVModal(true);

  const classes = useStyles();
  return (
    <Container align="center" className={classes.root}>
      <div style={{ marginBottom: 20 }}>
        <Typography variant="h3" component="h1">
          Welcome to{' '}
          <font style={{ color: '#35E82A', fontWeight: 'bold' }}>Pan-Lang</font>
        </Typography>
      </div>
      <div>
        <Link to={ORDER_FORM} style={{ color: 'white' }}>
          <Button className={classes.button} size="large">
            Start a new order
          </Button>
        </Link>
      </div>
      <div>
        <Link to={STOCK} style={{ color: 'white' }}>
          <Button className={classes.button} size="large">
            Edit and add stock items
          </Button>{' '}
        </Link>
      </div>
      <div>
        <Button className={classes.button} onClick={handleShow} size="large">
          {' '}
          Download Data
        </Button>
      </div>

      <br></br>
      <br></br>
      <Button
        className={classes.button}
        onClick={() => auth.signOut()}
        size="large"
      >
        Sign out
      </Button>

      {/* Download data modal */}
      <CsvModal show={showCSVModal} handleClose={handleClose} />
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 110,
  },
  button: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#119178',
    },
    borderRadius: '200px',
    margin: '5px',
    width: '100%',
    maxWidth: 500,
  },
}));
export default User;
