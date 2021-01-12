import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
    <Container maxWidth="sm" className={classes.page}>
      <Typography variant="h1" className={classes.title}>
        Order Form
      </Typography>
      <Formik
        validationSchema={orderSchema}
        onSubmit={onSubmit}
        initialValues={{
          firstName: '',
          lastName: '',
          adults: '',
          children: '',
          zipcode: '',
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
            <Typography variant="h3" className={classes.subtitle}>
              Enter patron information
            </Typography>

            {/* First name, last name */}
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  label="First name"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.firstName ? errors.firstName : ''}
                  error={touched.firstName && Boolean(errors.firstName)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  label="Last name"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.lastName ? errors.lastName : ''}
                  error={touched.lastName && Boolean(errors.lastName)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="adults"
                  label="# of Adults in Household"
                  value={values.adults}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.adults ? errors.adults : ''}
                  error={touched.adults && Boolean(errors.adults)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="children"
                  label="# of Children in Household"
                  value={values.children}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.children ? errors.children : ''}
                  error={touched.children && Boolean(errors.children)}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>

            <TextField
              id="zipcode"
              label="Zip/Postal code"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.zipcode ? errors.zipcode : ''}
              error={touched.zipcode && Boolean(errors.zipcode)}
              variant="outlined"
              fullWidth
              className={classes.formField}
            />

            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button
                onClick={handleSubmit}
                className={classes.submit}
                disabled={!isValid}
              >
                Select order
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
    backgroundColor: '#16AB8D',
    '&:hover': {
      backgroundColor: '#119178',
    },
    color: '#FFFFFF',
  },
  formField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default OrderForm;
