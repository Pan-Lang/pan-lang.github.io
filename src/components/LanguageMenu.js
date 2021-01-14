import React from 'react';
import { MenuItem, Menu, Button, makeStyles } from '@material-ui/core';

/**
 * Menu to select language when viewing Stock
 */
function LanguageMenu({
  languages = [],
  currentLanguage,
  buttonClass,
  setLanguage,
  isError = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    const locale = event.currentTarget.textContent;
    const selectedLanguage = languages.find((lang) => lang.locale === locale);
    setLanguage(selectedLanguage);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      {/* Button to toggle menu */}
      <Button onClick={handleClickListItem} className={buttonClass}>
        {`Language: ${currentLanguage.locale}`}
      </Button>

      {/* Language menu */}
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang, index) => (
          <MenuItem
            key={lang.tag}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            className={classes.menuItem}
          >
            {lang.locale}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  menuItem: {
    paddingLeft: '50px',
    paddingRight: '50px',
    textAlign: 'center',
  },
}));

export default LanguageMenu;
