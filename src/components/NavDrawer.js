import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

// Material UI
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import KitchenIcon from '@material-ui/icons/Kitchen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

// Routes and auth
import {
  ABOUT,
  LANDING,
  ORDER_FORM,
  ORDER_TRACKER,
  SIGN_IN,
  STOCK,
} from '../constants/Routes';
import { auth } from '../firebase';

/**
 * Left-anchored expandable drawer for navigation
 */
function NavDrawer({ open, handleOpen, handleClose }) {
  const history = useHistory();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  /**
   * Callback that toggles drawer on mobile
   */
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  };

  /**
   * Navigates user to specified page upon clicking drawer
   */
  function navigateTo(location) {
    history.push(location);
    // Close the drawer on mobile
    if (isMobile) {
      setTimeout(handleClose, 0);
    }
  }

  /**
   * Function to sign out from nav drawer
   */
  async function signOut() {
    await auth.signOut();
    navigateTo(LANDING);
  }

  const classes = useStyles();
  return (
    <SwipeableDrawer
      anchor="left"
      variant={isMobile ? 'temporary' : 'permanent'}
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !open && classes.drawerPaperClose,
          !open && isMobile && classes.drawerPaperCloseMobile
        ),
      }}
      open={open}
      onClose={toggleDrawer('left', false)}
      onOpen={toggleDrawer('left', true)}
      disableBackdropTransition={true}
      disableDiscovery={iOS}
      transitionDuration={{ appear: 100, enter: 100, exit: 400 }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />

      {/* Navigation */}
      <nav>
        <List>
          {/* Home */}
          <ListItem button onClick={() => navigateTo(LANDING)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          {/* Navigation only available to users */}
          {Boolean(auth.currentUser) && (
            <>
              {/* Stock */}
              <ListItem button onClick={() => navigateTo(STOCK)}>
                <ListItemIcon>
                  <KitchenIcon />
                </ListItemIcon>
                <ListItemText primary="Stock" />
              </ListItem>

              {/* Order Form */}
              <ListItem button onClick={() => navigateTo(ORDER_FORM)}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Order Form" />
              </ListItem>

              {/* Order Tracker */}
              <ListItem button onClick={() => navigateTo(ORDER_TRACKER)}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Order Tracker" />
              </ListItem>
            </>
          )}

          {/* About Pan-Lang */}
          <ListItem button onClick={() => navigateTo(ABOUT)}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Pan-Lang" />
          </ListItem>
        </List>

        <Divider />

        {/* User specific routes */}
        <List>
          {/* Sign in */}
          {!Boolean(auth.currentUser) && (
            <ListItem button onClick={() => navigateTo(SIGN_IN)}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
          )}

          {/* Sign out */}
          {Boolean(auth.currentUser) && (
            <ListItem button onClick={signOut}>
              <ListItemIcon>
                <TransitEnterexitIcon />
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </ListItem>
          )}
        </List>
        <Divider />
      </nav>

      {/* Expand/hide dashboard */}
      <div className={classes.toolbarIcon}>
        <IconButton onClick={open ? handleClose : handleOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
    </SwipeableDrawer>
  );
}

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '8px 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
    },
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    minHeight: '100vh',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  drawerPaperCloseMobile: {
    width: 0,
  },
}));

export default NavDrawer;
