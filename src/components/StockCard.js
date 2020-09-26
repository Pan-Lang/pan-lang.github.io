import React, { useEffect, useState } from 'react';
import { Button, Badge, Container, Card } from 'react-bootstrap';
import StockModal from './StockModal';

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

  return (
    <Card style={{ margin: 5 }}>
      <Card.Header as="h2">
      {hasLanguage ? stockItem[lang] : stockItem.name} 
          {lang !== 'name' && hasLanguage ? " (" + stockItem['name'] + ")" : ""}
      </Card.Header>
      <Card.Body>
        <Card.Text><h3>Amount: {stockItem.count}</h3></Card.Text>
        <Card.Text style={{ textAlign: 'right'}}>
          Last updated:{' '}
          {stockItem.timestamp !== undefined
            ? new Date(stockItem.timestamp).toDateString()
            : 'Unavailable'}
        </Card.Text>
        {!hasLanguage && (
          <Badge variant="danger">Language unavailable: {lang}</Badge>
        )}
      </Card.Body>
    </Card>
  );
}

export default StockCard;
