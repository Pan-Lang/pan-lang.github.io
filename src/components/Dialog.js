import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import cart from '../images/empty-cart.svg';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: 'center',
    marginBottom: theme.spacing(1),
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  image: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    marginTop: theme.spacing(20),
  },
  grid: {
    textAlign: 'center',
  },
}));

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00c853',
    },
    secondary: {
      main: '#00c853',
    },
    action: {
      main: '#00c853',
    },
  },
});

export default function AlertDialogSlide() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MuiThemeProvider theme={Theme}>
        <Dialog
          open={open}
          maxWidth="lg"
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'No orders at the moment'}
          </DialogTitle>
          <DialogActions className={classes.button}>
            <Button onClick={handleClose} color="primary" variant="contained">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
      <Grid container className={classes.grid}>
        <Grid item lg={4} sm={4}></Grid>
        <Grid item xs={12} lg={4} sm={4} className={classes.grid}>
          <img alt="Shopping cart" src={cart} className={classes.image} />
        </Grid>
        <Grid item lg={4} sm={4}></Grid>
      </Grid>
    </div>
  );
}
