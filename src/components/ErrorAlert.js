import React from 'react';
import { Alert } from 'react-bootstrap';

function ErrorAlert({ heading = '', body, dismissible = false, onClose }) {
  return (
    <Alert variant="danger" onClose={onClose} dismissible={dismissible} className={'mt-3'}>
      {heading.length > 0 && <Alert.Heading>{heading}</Alert.Heading>}
      {body}
    </Alert>
  );
}

export default ErrorAlert;
