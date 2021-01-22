import React from 'react';
import { MenuItem, Menu, Button, makeStyles } from '@material-ui/core';

/**
 * Menu to select language when viewing Stock
 * @param {{
 *   languages: Array<{ tag: String, locale: String }>,
 *   currentLanguage: { tag: String, locale: String },
 *   setLanguage: Function,
 *   isError: Error | Boolean
 * }}
 */
function LanguageMenu({
  languages = [],
  currentLanguage,
  setLanguage,
  isError = false,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  /** Toggler for opening/closing menu */
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /** Handler for selecting a new language */
  const handleMenuItemClick = (event, index) => {
    const locale = event.currentTarget.textContent;
    const selectedLanguage = languages.find((lang) => lang.locale === locale);
    setLanguage(selectedLanguage);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  /** Closes menu */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div>
      {/* Button to toggle menu */}
      <Button
        variant="contained"
        onClick={handleClickListItem}
        className={classes.toggle}
        size="small"
      >
        {currentLanguage.locale}
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
    textAlign: 'center',
  },
  toggle: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.borderColor,
    color:  theme.palette.primary.contrastText,
    textTransform: 'none',
    '&:hover': {
      backgroundColor:  theme.palette.primary.dark,
    },
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
  }
}));

export default LanguageMenu;
