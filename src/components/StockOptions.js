import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import LanguageMenu from './LanguageMenu';
import StockInput from './StockInput';

/**
 * Options on stock dashboard
 * - Language selection
 * - Refresh stock list
 * - Form to create new stock items
 */
function StockOptions({
  languages,
  currentLanguage,
  setLanguage,
  isError,
  getStock,
}) {
  const classes = useStyles();
  return (
    <Box>
      {/* Button bar */}
      <Container className={classes.buttonBar}>
        {/* Language selection */}
        <LanguageMenu
          languages={languages}
          currentLanguage={currentLanguage}
          buttonClass={classes.button}
          setLanguage={setLanguage}
          isError={isError}
        />

        {/* Refresh */}
        <Button size="medium" onClick={getStock} className={classes.button}>
          Refresh stock list
        </Button>
      </Container>

      {/* Input to create stock item */}
      {<StockInput getStock={getStock} />}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  buttonBar: {
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
  },
  button: {
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
  },
}));

export default StockOptions;
