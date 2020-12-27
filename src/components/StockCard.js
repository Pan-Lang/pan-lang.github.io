import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
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
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h4">
            {hasLanguage ? stockItem[lang] : stockItem.name}
            {lang !== 'name' && hasLanguage
              ? ' (' + stockItem['name'] + ')'
              : ''}
          </Typography>

          <Typography>
            Amount:{' '}
            <font style={{ fontWeight: 'bolder' }}>{stockItem.count}</font>
          </Typography>

          <Typography style={{ textAlign: 'right' }}>
            Last updated:{' '}
            {stockItem.timestamp !== undefined
              ? getItemDateString(stockItem)
              : 'Unavailable'}
          </Typography>

          {stockItem.count <= 0 && <ErrorAlert body="Warning: Out of stock" />}
        </CardContent>
        <CardActions>
          <Container
            style={{ display: 'flex', alignItems: 'center', padding: 0 }}
          >
            {!hasLanguage && (
              <Chip
                size="small"
                color="secondary"
                label={'Language unavailable'}
              />
            )}
            <div style={{ margin: 'auto' }} />
            <Button
              size="small"
              className={classes.button}
              onClick={handleShow}
            >
              Edit amount
            </Button>
          </Container>
        </CardActions>
      </Card>

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
    margin: 5,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#16AB8D',
    borderColor: '#FFFFF5',
    color: '#FFFFFF',
  },
}));

export default StockCard;
