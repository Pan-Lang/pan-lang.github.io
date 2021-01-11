import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FulfillModal from './FulfillModal';


/**
 * Displays:
 * - person's name
 * - order notes
 * - button that sends a socket emit to backend that
 *   sets fulfill to true
 */
function UnfulfilledOrderCard({ person, fulfillPerson }) {
  const [showFulfillModal, setShowFulfillModal] = useState(false);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowFulfillModal(false);
  const handleShow = () => setShowFulfillModal(true);

  const classes = useStyles();
  return (
    <>
      <Card>
        <CardContent>
          <Typography>
            {person}
          </Typography>
          <Typography>
            {person['order-notes']}
          </Typography>
          
        </CardContent>
        <CardActions>
        <Button onClick={handleShow}>Fulfill Order</Button>
        </CardActions>       
      </Card>

      <FulfillModal
        person={person}
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
  title: {
    fontSize: 14,
  },
  order:{
    fontsize: 8
  }
})

export default UnfulfilledOrderCard;
