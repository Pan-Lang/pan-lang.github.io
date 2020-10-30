import React from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Spinner
        animation="border"
        role="status"
        className="mt-3"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Container>
  );
}

export default Loading;
