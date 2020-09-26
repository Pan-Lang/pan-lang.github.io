import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import FulfillModal from './FulfillModal';

/**
 * Displays:
 * - person's name
 * - order notes
 * - button that sends a socket emit to backend that
 *   sets fulfill to true
 */
function UnfulfilledOrderCard({ person, fulfillPerson }) {
  const [showFulfillModal, setShowFulfillModal] = useState(false);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowFulfillModal(false);
  const handleShow = () => setShowFulfillModal(true);

  return (
    <>
      <Card
        key={person._id}
        size="lg"
        style={{ margin: 5 }}
      >
        <Card.Body>
          <Card.Header as="h2">
            {person.firstname} {person.lastname}
          </Card.Header>
          <Card.Text>{person['order-notes']}</Card.Text>
          <Button variant="success" onClick={handleShow} block>
            Fulfill Order
          </Button>
        </Card.Body>
      </Card>

      <FulfillModal
        person={person}
        show={showFulfillModal}
        handleClose={handleClose}
        fulfillPerson={fulfillPerson}
      />
    </>
  );
}

export default UnfulfilledOrderCard;
