import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FulfillModal from './FulfillModal';

/**
 * Displays:
 * - person's name
 * - order notes
 * - button that sends a socket emit to backend that
 *   sets fulfill to true
 */
function UnfulfilledOrderCard({ person, id, fulfillPerson }) {
  const [showFulfillModal, setShowFulfillModal] = useState(false);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowFulfillModal(false);
  const handleShow = () => setShowFulfillModal(true);

  const classes = useStyles();

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = date.toDateString() + " " + hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5">
            
            {person['firstName']} {person['lastName']}
          </Typography>
          <Typography>
            <Box textAlign="right">
              {formatDate(person['timestamp'].toDate())} 
            </Box>    
          </Typography>
          <Typography variant="body1">
            {person['order-notes']}
          </Typography>
          <Typography variant="body2">
            {person['additionalNotes']}
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button
            onClick={handleShow}
            className={classes.button}
            variant="contained"
            disableElevation
          >
            Fulfill Order
          </Button>
        </CardActions>
      </Card>

      <FulfillModal
        person={person}
        personId={id}
        show={showFulfillModal}
        handleClose={handleClose}
        fulfillPerson={fulfillPerson}
      />
    </>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  order: {
    fontsize: 12,
  },
  additional: {
    fontsize: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#119178',
    },
    marginBottom: 5,
  },
});

export default UnfulfilledOrderCard;
