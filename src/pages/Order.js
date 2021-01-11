import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ORDER_STOCK, LANDING } from '../constants/Routes';
import { auth } from '../firebase';

// Validation schema for order form
const orderSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  adults: Yup.number().moreThan(-1).required(),
  children: Yup.number().moreThan(-1).required(),
  zipcode: Yup.number().moreThan(9999).lessThan(100000).integer().required(),
  orderNotes: Yup.string().required(),
});

/**
 * Page to fill out form for patron's order
 */
function OrderForm() {
  const history = useHistory();

  // Immediately send user back to homepage if not signed in
  useEffect(() => {
    if (!Boolean(auth.currentUser)) {
      history.push(LANDING);
    }
  }, [history]);

  /**
   * Called upon form submission
   * @param {Object} personInfo info from submitted form
   */
  function onSubmit(personInfo) {
    // Redirects user to order stock page with the form data
    history.push(ORDER_STOCK, { fromForm: true, personInfo });
  }

  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.page}>
      <Typography variant="h1" className={classes.title}>
        Order Form
      </Typography>
      <Formik
        validationSchema={orderSchema}
        onSubmit={onSubmit}
        initialValues={{
          firstName: '',
          lastName: '',
          adults: -1,
          children: -1,
          zipcode: -1,
          orderNotes: 'test',
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
          <Paper className={classes.formPaper}>
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
                <Button onClick={handleSubmit} className={classes.submit}>
                  Select order
                </Button>
              </div>
            </Form>
          </Paper>
        )}
      </Formik>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    paddingBottom: '120px',
  },
  title: {
    textAlign: 'center',
    fontSize: theme.typography.h3.fontSize,
  },
  formPaper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
  },
  submit: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    borderRadius: '200px',
  },
}));

export default OrderForm;
