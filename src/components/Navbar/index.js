import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import CollapsingMenu from './CollapsingMenu';
import { AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core';
import logo from '../../images/logo_nobg.png';
import useMobile from '../../hooks/useMobile';

/**
 * Navigation bar at the top of window
 */
function Navbar({ drawerOpen, toggleDrawer, openDrawer, hasUser = false }) {
  const isMobile = useMobile();
  const classes = useStyles();
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!isMobile || !trigger}>
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          drawerOpen && !isMobile && classes.appBarShift
        )}
      >
        <Toolbar>
          {isMobile && (
            <IconButton onClick={openDrawer}>
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="Pan-Lang logo"
              style={{ width: 60, height: 60 }}
            />
          </Link>

          {!hasUser && <CollapsingMenu />}
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
