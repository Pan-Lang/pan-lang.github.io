import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import RefreshIcon from '@material-ui/icons/Refresh';
import Search from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import LanguageMenu from '../components/LanguageMenu';

/**
 * Search bar when displaying stock items
 * - Filters stock by name
 * - Changes language through dropdown
 * - Refreshes stock
 */
function SearchBar({
  stock,
  getFilteredStockItems,
  setNameQuery,
  getStock,
  LANGUAGES,
  language,
  setLanguage,
  error,
}) {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.searchPaper}>
      <Box display="flex" alignItems="center">
        {/* Search bar */}
        <TextField
          className={classes.search}
          type="search"
          id="searchbar"
          label={`Showing ${getFilteredStockItems().length} of ${
            stock.length
          } items`}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(event) => setNameQuery(event.target.value.toLowerCase())}
        />

        {/* Refresh stock button */}
        <IconButton size="medium" color="primary" onClick={getStock}>
          <RefreshIcon />
        </IconButton>

        {/* Language menu */}
        <LanguageMenu
          languages={LANGUAGES}
          currentLanguage={language}
          setLanguage={setLanguage}
          isError={error}
        />
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    margin: 5,
    padding: theme.spacing(2),
  },
  search: {
    width: '95%',
  },
}));

export default SearchBar;
