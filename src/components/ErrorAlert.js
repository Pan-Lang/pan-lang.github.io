import React from 'react';
import { Alert } from 'react-bootstrap';

function ErrorAlert({ heading, body, dismissible = false, onClose }) {
  return (
    <Alert variant="danger" onClose={onClose} dismissible={dismissible}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
}

export default ErrorAlert;
