import React from 'react';
import Container from 'react-bootstrap/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ORDER_STOCK } from '../constants/Routes';

const orderSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  adults: Yup.number().moreThan(-1).required(),
  children: Yup.number().moreThan(-1).required(),
  zipcode: Yup.number().moreThan(9999).lessThan(100000).integer().required(),
  orderNotes: Yup.string().required(),
});

function OrderForm() {
  const history = useHistory();

  return (
    <Container style={{ backgroundColor: 'white', paddingBottom: 120 }}>
      <h1 style={{ textAlign: 'center' }}>Order</h1>
      <Formik
        validationSchema={orderSchema}
        onSubmit={(personInfo) => {
          history.push(ORDER_STOCK, { fromForm: true, personInfo })
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          adults: -1,
          children: -1,
          zipcode: -1,
          orderNotes: 'test'
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
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group md="4" controlId="orderForm1">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder={'Enter first name here'}
                  onChange={handleChange}
                  isValid={touched.firstName && !errors.firstName}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="orderForm2">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder={'Enter last name here'}
                  onChange={handleChange}
                  isValid={touched.lastName && !errors.lastName}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="orderForm3">
                <Form.Label># of Adults</Form.Label>
                <Form.Control
                  type="number"
                  name="adults"
                  placeholder={'Enter number of adults in household'}
                  onChange={handleChange}
                  isValid={touched.adults && !errors.adults}
                  isInvalid={!!errors.adults}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="orderForm4">
                <Form.Label># of Children</Form.Label>
                <Form.Control
                  type="number"
                  name="children"
                  placeholder={'Enter number of children in household'}
                  onChange={handleChange}
                  isValid={touched.children && !errors.children}
                  isInvalid={!!errors.children}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" controlId="orderForm4">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  type="number"
                  name="zipcode"
                  placeholder={'Enter your ZIP Code'}
                  onChange={handleChange}
                  isValid={touched.zipcode && !errors.zipcode}
                  isInvalid={!!errors.zipcode}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button type="submit" style={{backgroundColor: '#16AB8D', borderColor: '#FFFFF5', color: '#FFFFFF', borderRadius: '200px'}} block>Select order</Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </Container>
  );
}

export default OrderForm;
