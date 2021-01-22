import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ORDER_STOCK, LANDING } from '../constants/Routes';
import { ORDER_STEPS } from '../constants/Order';
import { auth } from '../firebase';

// Validation schema for order form
const orderSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  adults: Yup.number().integer().positive().required('# of adults is required'),
  children: Yup.number()
    .integer()
    .positive()
    .required('# of children is required'),
  zipcode: Yup.string()
    .length(5)
    .test(
      'Valid ZIP code',
      'Must be a valid US ZIP code',
      (value) => /^\d+$/.test(value) // test for digits only
    )
    .required('ZIP code is required'),
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
  const requiredText = '*Required';
  return (
    <Container maxWidth="sm" className={classes.page}>
      <Typography variant="h1" className={classes.title}>
        Order Form
      </Typography>

      <Stepper activeStep={0} className={classes.stepper}>
        {ORDER_STEPS.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form */}
      <Formik
        validationSchema={orderSchema}
        onSubmit={onSubmit}
        initialValues={{
          firstName: '',
          lastName: '',
          adults: '',
          children: '',
          zipcode: '',
          orderNotes: 'order notes',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          handleReset,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Paper className={classes.formPaper}>
            <Typography variant="h3" className={classes.subtitle}>
              Enter patron information
            </Typography>

            {/* First name, last name */}
            <Grid container spacing={1}>
              {/* First name */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  label="First name"
                  required
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    touched.firstName ? errors.firstName : requiredText
                  }
                  error={touched.firstName && Boolean(errors.firstName)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>

              {/* Last name */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last name"
                  required
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : requiredText}
                  error={touched.lastName && Boolean(errors.lastName)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>

            {/* # of adults, # of children */}
            <Grid container spacing={1}>
              {/* # of adults */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="adults"
                  type="number"
                  required
                  label="# of Adults in Household"
                  value={values.adults}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.adults ? errors.adults : requiredText}
                  error={touched.adults && Boolean(errors.adults)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>

              {/* # of children */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="children"
                  type="number"
                  required
                  label="# of Children in Household"
                  value={values.children}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.children ? errors.children : requiredText}
                  error={touched.children && Boolean(errors.children)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>

            {/* Zip code */}
            <TextField
              id="zipcode"
              type="number"
              required
              label="Zip/Postal code"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.zipcode ? errors.zipcode : requiredText}
              error={touched.zipcode && Boolean(errors.zipcode)}
              variant="outlined"
              fullWidth
              className={classes.formField}
            />

            {/* Submit and clear buttons */}
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button
                onClick={handleSubmit}
                className={classes.submit}
              >
                Select order
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleReset}
              >
                Clear
              </Button>
            </div>
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
  stepper: {
    marginTop: theme.spacing(1),
  },
  formPaper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
  },
  subtitle: {
    fontSize: theme.typography.h5.fontSize,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.borderColor,
    color:  theme.palette.primary.contrastText,
    textTransform: 'none',
    '&:hover': {
      backgroundColor:  theme.palette.primary.dark,
    },
    marginLeft: theme.spacing(2),
  },
  formField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default OrderForm;
