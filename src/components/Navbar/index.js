import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import CollapsingMenu from './CollapsingMenu';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

/**
 * Navigation bar at the top of window
 */
function Navbar({ drawerOpen, toggleDrawer, hasUser = false }) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}
      >
        <Toolbar>
          {isMobile && hasUser && (
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Link to="/">
            <img
              src={require('../../images/logo_nobg.png')}
              alt="Pan-Lang logo"
              style={{ width: 75, height: 75 }}
            />
          </Link>

          {/* Navigation menu */}
          <CollapsingMenu />
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBar: {
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default Navbar;
