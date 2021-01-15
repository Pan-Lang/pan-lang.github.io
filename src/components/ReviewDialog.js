import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
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

function ReviewDialog({
  show,
  handleClose,
  submitRequest,
  requestedStockItems,
  personInfo,
}) {
  const { firstName, lastName, adults, children, zipcode } = personInfo;
  const classes = useStyles();
  return (
    <Dialog
      open={show}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={classes.modal}
    >
      <Fade in={show}>
        <Paper className={classes.paper}>
          <Typography variant="h3" className={classes.title}>
            Review Order
          </Typography>
          <Divider className={classes.divider} />

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
            multiline
          />

          {/* Submit button */}
          <Button
            variant="contained"
            color="primary"
            onClick={submitRequest}
            fullWidth
          >
            Submit request
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
