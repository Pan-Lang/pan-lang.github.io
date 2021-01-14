import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

/**
 * Card component for displaying basic stock information
 * @param {{ 
 *   stockItem: Object, 
 *   languageTag: String, 
 *   hasLanguage: Boolean, 
 *   handleShow: Function, 
 *   disableClick: Boolean, 
 *   visibleStockCount: Number, 
 *   showEnglishOnly: Boolean 
 * }}
 */
function StockInfo({
  stockItem,
  languageTag,
  hasLanguage,
  handleShow,
  disableClick = false,
  visibleStockCount = stockItem.count,
  showEnglishOnly,
  style,
}) {
  /**
   * Gets a String representing an item's timestamp
   * @param {Object} stockItem
   */
  function getItemDateString(stockItem) {
    let seconds = stockItem.timestamp._seconds;
    // Date constructor takes in milliseconds
    return new Date(seconds * 1000).toDateString().substr(3);
  }

  const classes = useStyles();
  return (
    <Card
      className={classes.card}
      onClick={disableClick ? null : handleShow}
      style={style}
    >
      {/* Action area makes entire component focusable */}
      <CardActionArea
        className={classes.cardAction}
        disabled={disableClick}
        disableRipple
      >
        <CardContent>
          {/* Top content of card */}
          <Box className={classes.topContent}>
            {/* Name and translation (left) */}
            <Box className={classes.nameContainer}>
              {/* Translated name */}
              <Typography variant="h4" className={classes.name}>
                {showEnglishOnly || !hasLanguage
                  ? stockItem.name
                  : stockItem.translations[languageTag]}
              </Typography>

              {/* English translation, if necessary */}
              <Typography variant="h5" className={classes.subname}>
                {showEnglishOnly || !hasLanguage ? '' : stockItem.name}
              </Typography>

              {/* No translation alert */}
              {/* If translated name is required but not present */}
              {!showEnglishOnly && !hasLanguage && (
                <Chip
                  className={classes.noTranslation}
                  size="small"
                  color="secondary"
                  label={'Translation unavailable'}
                />
              )}
            </Box>

            {/* Count (right) */}
            <Box className={classes.countContainer}>
              <Typography className={classes.countHeader}>Count</Typography>
              <Typography className={classes.count}>
                {visibleStockCount}
              </Typography>
            </Box>
          </Box>

          {/* Bottom content */}
          <Box className={classes.bottomContent}>
            {/* Date */}
            <Typography className={classes.date}>
              Updated:{' '}
              {stockItem.timestamp !== undefined
                ? getItemDateString(stockItem)
                : 'Unavailable'}
            </Typography>

            {/* Out of stock alert */}
            {stockItem.count <= 0 && (
              <Chip size="small" color="secondary" label={'Out of stock'} />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    borderRadius: '30px',
    maxWidth: '100vw',
  },
  cardAction: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.only('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
  topContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottomContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  nameContainer: {},
  name: {
    fontWeight: 'bold',
    fontSize: '25px',
    [theme.breakpoints.down('md')]: {
      fontSize: '19px',
    },
  },
  noTranslation: {
    marginTop: 5,
  },
  subname: {
    marginTop: -8,
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginTop: -4,
    },
  },
  date: {
    color: 'gray',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  countContainer: {},
  countHeader: {
    textAlign: 'right',
  },
  count: {
    marginTop: -10,
    fontWeight: 'bold',
    fontSize: '40px',
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      fontSize: '27px',
    },
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
  },
}));

export default StockInfo;
