import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Allows user to select how much of a stock item to request
 */
function OrderModal({
  show,
  handleClose,
  getStock,
  stockId,
  stockName,
  stockCount,
  onRequest,
}) {
  const [selectedAmount, setSelectedAmount] = useState(1);

  /** Decreases selected amount by 1 */
  function handleDecrease() {
    if (selectedAmount > 1) setSelectedAmount(selectedAmount - 1);
  }

  /** Increases selected amount by 1 */
  function handleIncrease() {
    if (selectedAmount < stockCount) setSelectedAmount(selectedAmount + 1);
  }

  /**
   * Assigns new selected amount based on text field input from `onChange`
   */
  function changeSelectedAmount(event) {
    const amount = event.currentTarget.valueAsNumber;
    if (isNaN(Number(amount)) || amount < 1) {
      setSelectedAmount(1);
    } else if (amount > stockCount) {
      setSelectedAmount(stockCount);
    } else {
      setSelectedAmount(amount);
    }
  }

  /**
   * Adds requested item to order list
   */
  function submitRequest() {
    const requestedItem = {
      id: stockId,
      name: stockName,
      requestedCount: selectedAmount,
      countAfterRequest: stockCount - selectedAmount,
    };

    onRequest(requestedItem);
    handleClose();
  }

  // Wrapper for bolding text within a component
  const Bold = ({ children }) => (
    <font style={{ fontWeight: 'bold' }}>{children}</font>
  );

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
          {/* Heading */}
          <Typography variant="h5">
            Select requested amount for: <Bold>{stockName}</Bold>
          </Typography>
          <Divider />

          {/* Counts */}
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <Typography>
                Current amount: <Bold>{stockCount}</Bold>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>
                Amount after request: <Bold>{stockCount - selectedAmount}</Bold>
              </Typography>
            </Grid>
          </Grid>

          {/* Stock count selection */}
          <ButtonGroup fullWidth className={classes.buttonGroup}>
            {/* Decrease */}
            <IconButton
              onClick={handleDecrease}
              className={classes.incrementor}
            >
              <RemoveIcon />
            </IconButton>

            {/* Enter requested amount */}
            <TextField
              type="number"
              placeholder={selectedAmount}
              value={selectedAmount}
              onChange={changeSelectedAmount}
              className={classes.textField}
            />

            {/* Increase */}
            <IconButton
              onClick={handleIncrease}
              className={classes.incrementor}
            >
              <AddIcon />
            </IconButton>
          </ButtonGroup>

          {/* Request button */}
          <Button className={classes.button} onClick={submitRequest}>
            Request amount
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
}

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
    minWidth: '20vw',
  },
  button: {
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#119178',
    },
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  closeButton: {
    width: '100%',
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  incrementor: {
    width: '25%',
  },
  textField: {
    maxWidth: '50%',
  },
}));

export default OrderModal;
