import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  buttonCollapse: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    margin: '10px',
    boxShadow: 'none',
  },
}));

/**
 * Responsive button for use in navbar
 * Base code from: https://codesandbox.io/s/64kr4k1lww?file=/demo.js
 */
function CollapsingButton({ children }) {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.buttonCollapse}>
      <IconButton
        onClick={(event) => setOpen(Boolean(event.currentTarget))}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={() => setOpen(false)}
      >
        {children}
      </Menu>
    </div>
  );
}

export default CollapsingButton;
