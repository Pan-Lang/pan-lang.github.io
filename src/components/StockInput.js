import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStockItem } from '../api/Stock';
import { auth } from '../firebase';
import { makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

/**
 * Form component that handles creation of new stock items
 */
function StockInput({ getStock }) {
  const [loading, setLoading] = useState(false);
  /**
   * Handles sending new stock item requests to API
   * @param {Object} values { name, count } from form
   */
  async function onSubmit(values) {
    setLoading(true);

    // Create item with user's id
    const item = {
      ...values,
      pantry: auth.currentUser.uid,
    };

    // Send request to API and stop loading once promise is resolved
    await createStockItem(item);

    setLoading(false);
    getStock(500);
  }

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
          <Formik
            validationSchema={itemSchema}
            onSubmit={onSubmit}
            initialValues={{
              name: '',
              count: 1,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              handleReset,
              isSubmitting,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <>
                {/* Item name text field */}
                <TextField
                  id="name"
                  label="Enter new item name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.name ? errors.name : ''}
                  error={touched.name && Boolean(errors.name)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />

                {/* Item count text field */}
                <TextField
                  id="count"
                  label="Enter new item count"
                  value={values.count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.count ? errors.count : ''}
                  error={touched.count && Boolean(errors.count)}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />

                {/* Form buttons */}
                <Container className={classes.actions}>
                  {/* Submit button */}
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={loading || isSubmitting}
                    className={classes.button}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Adding...' : 'Add item'}
                  </Button>

                  {/* Clear button */}
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={handleReset}
                  >
                    Clear
                  </Button>
                </Container>
              </>
            )}
          </Formik>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

// Schema for new stock item
const itemSchema = Yup.object({
  name: Yup.string().required(),
  count: Yup.number().integer().moreThan(-1).required(),
});

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
    flexDirection: 'column',
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
