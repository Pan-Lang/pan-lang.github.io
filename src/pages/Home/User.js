import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CsvModal from '../../components/CSVModal';
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

  return (
    <Container style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 20 }}>
        <br></br>
        <h1>Welcome to </h1>{' '}
        <h1>
          <font style={{ color: '#35E82A', fontWeight: 'bold' }}>Pan-</font>
          <font style={{ color: '#2EFFD5', fontWeight: 'bold' }}>Lang</font>
        </h1>
      </div>
      <div>
        <Link to={ORDER_FORM} style={{ color: 'white' }}>
          <Button
            style={{
              backgroundColor: '#16AB8D',
              borderColor: '#FFFFF5',
              color: '#FFFFFF',
              borderRadius: '200px',
            }}
            size="lg"
            className="mb-3"
            block
          >
            Start a new order
          </Button>
        </Link>
      </div>
      <div>
      <Link to={STOCK} style={{ color: 'white' }}>
        <Button
          style={{
            backgroundColor: '#16AB8D',
            borderColor: '#FFFFF5',
            color: '#FFFFFF',
            borderRadius: '200px',
          }}
          size="lg"
          className="mb-3"
          block
        >
          Edit and add stock items
        </Button>{' '}
      </Link>
      </div>
      <div>
        <Button
          onClick={handleShow}> Download Data
        </Button>
      </div>

      <br></br>
      <br></br>
      <Button
        style={{
          backgroundColor: '#16AB8D',
          borderColor: '#FFFFF5',
          color: '#FFFFFF',
          borderRadius: '200px',
        }}
        size="lg"
        className="mb-3"
        block
        onClick={() => auth.signOut()}
      >
        Sign out
      </Button>
      <CsvModal
      show={showCSVModal}
      handleClose={handleClose}>

      </CsvModal>
    </Container>
    
  );
}

export default User;
