import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateStockCount } from '../api/Stock';

const amountSchema = Yup.object({
  newCount: Yup.number().integer().moreThan(-1).required(),
});

function StockModal({ show, handleClose, getStock, stockId, stockName, stockCount }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Formik
        validationSchema={amountSchema}
        onSubmit={(updatedCount) => {
          console.log(updatedCount);
          updateStockCount(stockId, updatedCount);
          handleClose();
          getStock(500);
        }}
        initialValues={{
          newCount: -1,
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
          <>
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
                    name="newCount"
                    placeholder={'Insert new item count'}
                    onChange={handleChange}
                    isValid={touched.newCount && !errors.newCount}
                    isInvalid={!!errors.newCount}
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
          </>
        )}
      </Formik>
    </Modal>
  );
}

export default StockModal;
