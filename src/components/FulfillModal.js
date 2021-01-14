import React from 'react';
import { Button, Modal } from 'react-bootstrap';

/**
 * Confirmation modal when fulfilling a person's order
 */
function FulfillModal({ person, personId, show, handleClose, fulfillPerson }) {
  /**
   * Handles confirmation of fulfilling a person's order
   */
  function handleConfirm() {
    fulfillPerson(personId);
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
          Are you sure that {person.firstName}'s order is correct and has been
          fulfilled?
        </h5>
        <p>{person['order-notes']}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" style={{borderRadius: '200px'}} onClick={handleClose}>
          Close
        </Button>
        <Button onClick={handleConfirm}
        style={{backgroundColor: '#35E82A', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}}>
          Confirm fulfillment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FulfillModal;
