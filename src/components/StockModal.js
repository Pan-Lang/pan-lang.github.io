import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ErrorAlert from './ErrorAlert';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updateStockCount } from '../api/Stock';

/**
 * Popup modal for editing the stock count of an item
 */
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

  /**
   * Sends PUT request with updated stock count from input
   * @param {Number} updatedCount updated count
   */
  async function onSubmit(updatedCount) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
      getStock(500);
      alert('Not connected to API');
    }, 500);

    // TODO: send PUT request to API
    // const updateIsSuccessful = await updateStockCount(stockId, updatedCount);

    // setLoading(false);

    // if (!updateIsSuccessful) {
    //   setError(true);
    // } else {
    //   handleClose();
    //   getStock(500);
    // }
  }

  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <Paper className={classes.paper}>
          <Formik
            validationSchema={amountSchema}
            onSubmit={onSubmit}
            initialValues={{
              newCount: '',
            }}
          >
            {/* Formik component */}
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
                <Typography variant="h5">
                  Edit amount for: {stockName}
                </Typography>

                {/* Text field for entering new amount */}
                {!loading && !error && (
                  <Container className={classes.form}>
                    <Typography>Current amount: {stockCount}</Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        id="newCount"
                        label="Enter new item count"
                        value={values.newCount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.newCount ? errors.newCount : ''}
                        error={touched.newCount && Boolean(errors.newCount)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                      />
                    </form>
                  </Container>
                )}

                {/* Message when processing request */}
                {loading && (
                  <Typography>
                    Updating stock count for {stockName}...
                  </Typography>
                )}

                {/* Error message */}
                {error && <ErrorAlert body="An error occurred." />}

                {/* Action buttons */}
                {!loading && (
                  <Container className={classes.actions}>
                    {/* Submit button */}
                    {!error && (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.button}
                      >
                        Save new amount
                      </Button>
                    )}

                    {/* Close modal button */}
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.closeButton}
                      onClick={() => {
                        // Set timer so buttons don't reappear during
                        // fade out animation
                        setTimeout(() => {
                          setError(false);
                          setLoading(false);
                        }, 120);

                        handleClose();
                      }}
                    >
                      Close
                    </Button>
                  </Container>
                )}
              </>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
}

// Schema for updating count
const amountSchema = Yup.object({
  newCount: Yup.number().integer().moreThan(-1).required(),
});

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px',
  },
  button: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#119178',
    },
    width: '100%',
    marginBottom: 5,
  },
  closeButton: {
    width: '100%',
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

export default StockModal;
