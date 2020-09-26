import React from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * Confirmation modal when fulfilling a person's order
 */
function FulfillModal({ person, show, handleClose, fulfillPerson }) {
  /**
   * Handles confirmation of fulfilling a person's order
   */
  function handleConfirm() {
    fulfillPerson(person._id);
    handleClose();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>Confirm fulfillment</Modal.Header>
      <Modal.Body>
        <h5>
          Are you sure that {person.firstname}'s order is correct and has been
          fulfilled?
        </h5>
        <p>{person['order-notes']}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleConfirm}>
          Confirm fulfillment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FulfillModal;
