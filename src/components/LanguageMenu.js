import React from 'react';
import { makeStyles, MenuItem, Menu, Button } from '@material-ui/core';

/**
 * Menu to select language when viewing Stock
 */
function LanguageMenu({
  languages = [],
  currentLanguage,
  buttonClass,
  capitalize,
  setLanguage,
  isError = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setLanguage(event.currentTarget.textContent);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Button to toggle menu */}
      <Button onClick={handleClickListItem} className={buttonClass}>
        {`Language: ${capitalize(currentLanguage)}`}
      </Button>

      {/* Language menu */}
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang, index) => (
          <MenuItem
            key={lang}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {capitalize(lang)}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({}));

export default LanguageMenu;
