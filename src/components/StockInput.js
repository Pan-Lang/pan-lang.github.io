import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/**
 * Handles creation of new stock items
 */
function StockInputForm({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
}) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <TextField
              id="itemName"
              label="New item name"
              value={values.itemName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.itemName ? errors.itemName : ''}
              error={touched.itemName && Boolean(errors.itemName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="itemCount"
              label="New item count"
              value={values.itemCount}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.itemCount ? errors.itemCount : ''}
              error={touched.itemCount && Boolean(errors.itemCount)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary" disabled={isSubmitting}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  );
}

// Formik wrapper for component
const StockInput = withFormik({
  mapPropsToValues: ({
    itemName,
    itemCount,
  }) => {
    return {
      itemName: itemName || '',
      itemCount: itemCount || 1,
    };
  },

  validationSchema: Yup.object({
    itemName: Yup.string().required(),
    itemCount: Yup.number().integer().moreThan(-1).required(),
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(StockInputForm);

// Styling
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
  },
  card: {
    width: '100%',
    marginTop: 5,
  },
  actions: {
    float: 'right',
  },
}));


export default StockInput;
