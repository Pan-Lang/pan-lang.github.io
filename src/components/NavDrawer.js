import React from 'react';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

function NavDrawer({ open, handleOpen, handleClose }) {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const classes = useStyles();

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
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem>Home</ListItem>
        <ListItem>Logout</ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>Stock</ListItem>
        <ListItem>Order Form</ListItem>
        <ListItem>Order Tracker</ListItem>
      </List>
      <Divider />
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
    padding: '13px 8px',
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
