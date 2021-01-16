import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { Box, Fade, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

/**
 * Confirmation modal when fulfilling a person's order
 */
function FulfillModal({ person, personId, show, handleClose, fulfillPerson }) {
  /**
   * Handles confirmation of fulfilling a person's order
   */
  function handleConfirm() {
    fulfillPerson(personId);
    handleClose();
  }

  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      aria-describedby={"modal-to-fulfill " + person.firstName}
      open={show}
      onClose={handleClose}
      closeAfterTransition
      centered
      className={classes.modal}
    >
      <Fade in={show}>
        <Paper className={classes.paper}>
          <h3>Confirm fulfillment</h3>
          <h5>
            Are you sure that {person.firstName}'s order is correct and has been
            fulfilled?
          </h5>
          <p>{person['order-notes']}</p>
          <p>{person['additionalNotes']}</p>

          <Button 
            color="secondary" 
            variant="contained"
            className={classes.close} 
            onClick={handleClose}>
            Close
          </Button>
          <Button 
            onClick={handleConfirm}
            className={classes.confirm}>
            Confirm fulfillment
          </Button>
        </Paper> 
      </Fade>
    </Modal>
  );
}

const useStyles = makeStyles((theme) => ({
  confirm:{
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#119178',
    }, 
    borderRadius: '200px'
  },
  close:{
    borderRadius: '200px',
    margin: '5px'
  },
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

}));


export default FulfillModal;
