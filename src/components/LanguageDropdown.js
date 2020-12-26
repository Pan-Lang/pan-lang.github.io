import React from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';

/**
 * Dropdown to select language
 * Base code: https://material-ui.com/components/menus/#menulist-composition
 */
function LanguageDropdown({
  languages = [],
  currentLanguage,
  buttonClass,
  capitalize,
  setLanguage,
  isError = false,
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    // FIXME: Disallowing toggle while error because the error icon
    // shows over the dropdown...
    if (isError) return;
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleSelection(event) {
    // FIXME: there must be a better way to do this...
    setLanguage(event.currentTarget.textContent);
    // Timeout to let animation play; too abrupt without
    setTimeout(() => handleClose(event), 140);
  }

  // Return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      {/* Dropdown button toggle */}
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={buttonClass}
      >
        {`Language: ${capitalize(currentLanguage)}`}
      </Button>

      {/* Dropdown positioner */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {/* Dropdown animation */}
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            {/* Dropdown container */}
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>

                {/* Dropdown component */}
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {/* Language options */}
                  {languages.map((lang) => (
                    <MenuItem
                      key={lang}
                      className={classes.menuItem}
                      onClick={handleSelection}
                    >
                      {capitalize(lang)}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    paddingLeft: 40,
    paddingRight: 40,
  },
}));

export default LanguageDropdown;
