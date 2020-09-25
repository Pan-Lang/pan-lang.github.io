import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function StockInput() {
  
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click here to insert a stock item
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form>
              <Form.Group controlId="inputStock">
                <Form.Control type="text" placeholder="Stock item name" />
                <Form.Control type="number" placeholder="Stock item count" />                  
              </Form.Group>
              <Button variant="outline-success">
                Enter stock into database
              </Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default StockInput;
