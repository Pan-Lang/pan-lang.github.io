import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

/**
 * Component signifying an error has occurred
 */
function ErrorAlert({ heading = '', body, onClose }) {
  return (
    <Alert severity="error" onClose={onClose}>
      {heading.length > 0 && <AlertTitle>{heading}</AlertTitle>}
      {body}
    </Alert>
  );
}

export default ErrorAlert;
