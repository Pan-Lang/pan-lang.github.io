import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const stockSchema = Yup.object({
  name: Yup.string().required(),
  count: Yup.number().integer().moreThan(-1).required(),
});

function StockInput() {
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Click here to insert a stock item
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Formik
              validationSchema={stockSchema}
              onSubmit={(e) => console.log(e)}
              initialValues={{
                name: '',
                count: -1,
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group controlId="stockInputName">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder={'Insert item name here'}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="stockInputCount">
                    <Form.Control
                      type="number"
                      name="count"
                      placeholder={'Insert item count here'}
                      onChange={handleChange}
                      isValid={touched.count && !errors.count}
                      isInvalid={!!errors.count}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="success" type="submit">Add item to database</Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default StockInput;
