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
import Tooltip from '@material-ui/core/Tooltip';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import { makeStyles } from '@material-ui/core';

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
import useMobile from '../hooks/useMobile';

/**
 * Left-anchored expandable drawer for navigation
 */
function NavDrawer({ open, handleOpen, handleClose }) {
  const history = useHistory();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isMobile = useMobile();

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
      handleClose();
    }
  }

  /**
   * Function to sign out from nav drawer
   */
  async function signOut() {
    await auth.signOut();
    navigateTo(LANDING);
  }

  // List of pages displayed in drawer for navigation
  const navigationItems = [
    {
      title: 'Home',
      destination: LANDING,
      icon: <HomeIcon />,
      userOnly: false,
    },
    {
      title: 'Stock',
      destination: STOCK,
      icon: <KitchenIcon />,
      userOnly: true,
    },
    {
      title: 'Order Form',
      destination: ORDER_FORM,
      icon: <ShoppingCartIcon />,
      userOnly: true,
    },
    {
      title: 'Order Tracker',
      destination: ORDER_TRACKER,
      icon: <AssignmentTurnedInIcon />,
      userOnly: true,
    },
    {
      title: 'About Pan-Lang',
      destination: ABOUT,
      icon: <InfoIcon />,
      userOnly: false,
    },
  ];

  // List of items in drawer related to users & auth
  const userItems = [
    {
      title: 'Sign in',
      onClick: () => navigateTo(SIGN_IN),
      icon: <ExitToAppIcon />,
      forUsers: false,
    },
    {
      title: 'Sign Out',
      onClick: signOut,
      icon: <TransitEnterexitIcon />,
      forUsers: true,
    },
  ];

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
          {navigationItems.map(
            (item) =>
              (Boolean(auth.currentUser) || !item.userOnly) && (
                <Tooltip
                  title={item.title}
                  placement="right"
                  arrow
                  enterDelay={0}
                  disableHoverListener={open}
                  key={item.destination}
                >
                  <ListItem button onClick={() => navigateTo(item.destination)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Tooltip>
              )
          )}
        </List>

        <Divider />

        {/* User specific routes */}
        <List>
          {userItems.map(
            (item) =>
              ((item.forUsers && Boolean(auth.currentUser)) ||
                !(item.forUsers || Boolean(auth.currentUser))) && (
                <Tooltip
                  title={item.title}
                  placement="right"
                  arrow
                  enterDelay={0}
                  disableHoverListener={open}
                  key={item.title}
                >
                  <ListItem button onClick={item.onClick}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Tooltip>
              )
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
