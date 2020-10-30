import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateStockCount } from '../api/Stock';

const amountSchema = Yup.object({
  newCount: Yup.number().integer().moreThan(-1).required(),
});

function StockModal({
  show,
  handleClose,
  getStock,
  stockId,
  stockName,
  stockCount,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(updatedCount) {
    setLoading(true);
    const updateIsSuccessful = await updateStockCount(stockId, updatedCount);

    setLoading(false);

    if (!updateIsSuccessful) {
      setError(true);
    } else {
      handleClose();
      getStock(500);
    }
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Formik
        validationSchema={amountSchema}
        onSubmit={onSubmit}
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

            {/* Body of modal; changes upon sending update request */}
            <Modal.Body>
              {!loading && !error && (
                <>
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
                </>
              )}

              {loading && <p>Updating stock count for {stockName}...</p>}

              {error && <p>An error occurred when trying to update stock.</p>}
            </Modal.Body>

            <Modal.Footer>
              {!loading && (
                <>
                  <Button
                    variant="secondary"
                    style={{borderRadius: '200px'}}
                    onClick={() => {
                      setError(false);
                      setLoading(false);
                      handleClose();
                    }}
                  >
                    Close
                  </Button>
                  {!error && (
                    <Button onClick={handleSubmit}
                    style={{backgroundColor: '#16AB8D', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}}>
                      Save new amount
                    </Button>
                  )}
                </>
              )}
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}

export default StockModal;
