import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Fade, makeStyles } from '@material-ui/core';
import StockModal from './StockModal';
import ErrorAlert from './ErrorAlert';

function StockCard({ stockItem, getStock, lang = 'name' }) {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);

  // Handlers for showing/closing modal when editing item amount
  const handleClose = () => setShowAmountModal(false);
  const handleShow = () => setShowAmountModal(true);

  // Determine whether this stock item has a name in the specified language
  useEffect(() => {
    setHasLanguage(stockItem[lang] !== undefined);
  }, [lang, stockItem]);

  /**
   * Gets a String representing an item's timestamp
   * @param {Object} stockItem
   */
  function getItemDateString(stockItem) {
    let seconds = stockItem.timestamp._seconds;
    // Date constructor takes in milliseconds
    return new Date(seconds * 1000).toDateString();
  }

  const classes = useStyles();
  return (
    <>
      <Fade in={true}>
        <Card className={classes.card} onClick={handleShow}>
          {/* Action area makes entire component focusable */}
          <CardActionArea>
            <CardContent>
              {/* Top content of card */}
              <Container className={classes.topContent}>
                {/* Name and translation (left) */}
                <Box className={classes.nameContainer}>
                  {/* Name */}
                  <Typography variant="h4" className={classes.name}>
                    {hasLanguage ? stockItem[lang] : stockItem.name}
                  </Typography>

                  {/* Translation */}
                  <Typography variant="h5" className={classes.subname}>
                    {hasLanguage && lang !== 'name' ? stockItem.name : ''}
                  </Typography>

                  {/* No translation alert */}
                  {!hasLanguage && (
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
                    {stockItem.count}
                  </Typography>
                </Box>
              </Container>
              <Container className={classes.bottomContent}>
                {/* Date */}
                <Typography className={classes.date}>
                  Last updated:{' '}
                  {stockItem.timestamp !== undefined
                    ? getItemDateString(stockItem)
                    : 'Unavailable'}
                </Typography>

                {/* Out of stock alert */}
                {stockItem.count <= 0 && (
                  <Chip
                    size="small"
                    color="secondary"
                    label={'Out of stock'}
                  />
                )}
              </Container>
            </CardContent>
          </CardActionArea>
        </Card>
      </Fade>

      <StockModal
        show={showAmountModal}
        handleClose={handleClose}
        getStock={getStock}
        stockName={hasLanguage ? stockItem[lang] : stockItem.name}
        stockId={stockItem._id}
        stockCount={stockItem.count}
      />
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(1),
    borderRadius: '30px',
  },
  cardAction: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
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
    fontSize: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '22px',
    }
  },
  noTranslation: {
    marginTop: 5,
  },
  subname: {
    marginTop: -8,
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginTop: -4,
    }
  },
  date: {
    color: 'gray',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    }
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
    }
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
  },
}));

export default StockCard;
