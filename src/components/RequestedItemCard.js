import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import OrderModal from './OrderModal';

/**
 * Card displaying a requested stock item on Order Stock page
 */
function RequestedItemCard({
  requestedItem,
  onRequest,
  removeRequestedItem,
  showActions = true,
}) {
  const { id, name, requestedCount, countAfterRequest } = requestedItem;
  const [showOrderModal, setShowAmountModal] = useState(false);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowAmountModal(false);
  const handleShow = () => setShowAmountModal(true);

  // Removes requested item from list using callback
  function removeItem() {
    removeRequestedItem(requestedItem);
  }

  const classes = useStyles();
  return (
    <>
      <Fade in>
        <Card className={classes.card} variant="outlined" raised>
          <Box display="flex" justifyContent="space-between">
            {/* Item name and count */}
            <CardContent display="flex">
              <Typography>
                {name}:{' '}
                <font style={{ fontWeight: 'bold' }}>{requestedCount}</font>
              </Typography>
            </CardContent>

            {/* Edit count and remove item */}
            {showActions && (
              <CardActions>
                <IconButton color="primary" onClick={handleShow}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={removeItem}>
                  <CancelIcon />
                </IconButton>
              </CardActions>
            )}
          </Box>
        </Card>
      </Fade>

      <OrderModal
        show={showOrderModal}
        handleClose={handleClose}
        stockName={name}
        stockId={id}
        stockCount={countAfterRequest}
        onRequest={onRequest}
        defaultAmount={requestedCount}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default RequestedItemCard;
