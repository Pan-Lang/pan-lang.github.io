import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LANDING } from '../constants/Routes';

/**
 * Dialog to let volunteer and patron review order before submitting
 */
function ReviewDialog({
  show,
  handleClose,
  submitRequest,
  requestedStockItems,
  personInfo,
}) {
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [requestLoading, setRequestLoading] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(null);
  const history = useHistory();
  const { firstName, lastName, adults, children, zipcode } = personInfo;

  async function submitOrder() {
    setRequestLoading(true);
    const success = await submitRequest(additionalNotes);

    setRequestLoading(false);
    setRequestSuccess(success);
  }

  function finishOrder() {
    history.push(LANDING);
  }

  function getSubmitButtonText() {
    if (requestLoading) {
      return 'Submitting...';
    } else if (requestSuccess) {
      return 'Go to home page';
    } else {
      return 'Submit request';
    }
  }

  const title = requestSuccess ? 'Order requested!' : 'Review Order';
  const classes = useStyles();
  return (
    <Dialog
      open={show}
      onClose={requestSuccess ? finishOrder : handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={classes.modal}
      fullWidth
    >
      <Fade in={show}>
        <Paper className={classes.paper}>
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
          <Divider className={classes.divider} />

          {/* Hide items after request is received */}
          {!requestSuccess && (
            <Box>
              {/* Requested items */}
              <Typography variant="h4" className={classes.subtitle}>
                Requested items:
              </Typography>
              <List dense>
                {requestedStockItems.map((r) => (
                  <ListItem key={r.name}>
                    <ListItemText primary={`${r.name}: ${r.requestedCount}`} />
                  </ListItem>
                ))}
              </List>

              {/* Patron info */}
              <Typography variant="h4" className={classes.subtitle}>
                Patron info:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary={firstName} secondary="First name" />
                </ListItem>
                <ListItem>
                  <ListItemText primary={lastName} secondary="Last name" />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={adults}
                    secondary="# of adults in household"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={children}
                    secondary="# of children in household"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={zipcode} secondary="Zipcode" />
                </ListItem>
              </List>

              {/* Space for additional notes */}
              <TextField
                variant="filled"
                label="Additional notes"
                className={classes.additionalNotes}
                onChange={(e) => setAdditionalNotes(e.currentTarget.value)}
                multiline
              />
            </Box>
          )}

          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            onClick={requestSuccess ? finishOrder : submitOrder}
            disabled={requestLoading}
            fullWidth
          >
            {getSubmitButtonText()}
          </Button>
        </Paper>
      </Fade>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  additionalNotes: {
    marginBottom: theme.spacing(3),
    width: '100%',
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
    minWidth: '30vw',
  },
  title: {
    fontSize: theme.typography.h4.fontSize,
    textAlign: 'center',
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    fontSize: 20,
  },
}));

export default ReviewDialog;
