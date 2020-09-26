import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const amountSchema = Yup.object({
  count: Yup.number().integer().moreThan(-1).required(),
});

function StockModal({ show, handleClose, stockId, stockName, stockCount }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Formik
        validationSchema={amountSchema}
        onSubmit={(e) => {
          console.log(e);
          // send put request
          handleClose();
        }}
        initialValues={{
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
          <div>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit amount for: {stockName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Current amount: {stockCount}</p>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="stockCount">
                  <Form.Control
                    type="number"
                    name="count"
                    placeholder={'Insert new item count'}
                    onChange={handleChange}
                    isValid={touched.count && !errors.count}
                    isInvalid={!!errors.count}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save new amount
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Formik>
    </Modal>
  );
}

export default StockModal;
