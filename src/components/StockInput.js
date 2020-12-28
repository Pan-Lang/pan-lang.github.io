import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { withFormik } from 'formik';
import * as Yup from 'yup';

/**
 * Form component that handles creation of new stock items
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
      <Accordion>
        {/* Accordion toggle area */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="stock-input-content"
          id="stock-input-header"
        >
          <Typography>Click here to insert a stock item</Typography>
        </AccordionSummary>

        {/* Accordion expandable area */}
        <AccordionDetails className={classes.details}>
          <form onSubmit={handleSubmit}>
            {/* Item name text field */}
            <TextField
              id="itemName"
              label="Enter new item name"
              value={values.itemName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.itemName ? errors.itemName : ''}
              error={touched.itemName && Boolean(errors.itemName)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            {/* Item count text field */}
            <TextField
              id="itemCount"
              label="Enter new item count"
              value={values.itemCount}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.itemCount ? errors.itemCount : ''}
              error={touched.itemCount && Boolean(errors.itemCount)}
              margin="dense"
              variant="outlined"
              fullWidth
            />

            {/* Form buttons */}
            <Container className={classes.actions}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                className={classes.button}
              >
                {isSubmitting ? 'Adding...' : 'Add item'}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleReset}
              >
                Clear
              </Button>
            </Container>
          </form>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

// Formik wrapper for component
const StockInput = withFormik({
  // Assigns default values
  mapPropsToValues: ({ itemName, itemCount }) => {
    return {
      itemName: itemName || '',
      itemCount: itemCount || 1,
    };
  },

  // Schema for validation
  validationSchema: Yup.object({
    itemName: Yup.string().required(),
    itemCount: Yup.number().integer().moreThan(-1).required(),
  }),

  // Function upon submitting form
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // TODO: send information to API
      alert('API not connected');
      setSubmitting(false);
    }, 1000);
  },
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
  details: {
    display: 'flex',
    justifyContent: 'center',
  },
  actions: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  button: {
    backgroundColor: '#16AB8D',
    '&:hover': {
      backgroundColor: '#119178',
    },
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    marginRight: theme.spacing(1),
  },
}));

export default StockInput;
