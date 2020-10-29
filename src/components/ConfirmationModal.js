import React, { useState } from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

/**
 * Modal to give user confirmation upon completing action
 */
function ConfirmationModal({ title, body, show, handleClose }) {  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {body}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>
          Back to Home
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal;
