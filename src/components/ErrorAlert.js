import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

/**
 * Component signifying an error has occurred, or
 * a different specified severity
 * See: https://material-ui.com/components/alert/#alert
 */
function ErrorAlert({ heading = '', body, severity = 'error', onClose }) {
  return (
    <Alert severity={severity} onClose={onClose}>
      {heading.length > 0 && <AlertTitle>{heading}</AlertTitle>}
      {body}
    </Alert>
  );
}

export default ErrorAlert;
