import React, { useEffect, useState } from 'react';
import { Button, Badge, Container, Card } from 'react-bootstrap';

function StockCard({ stockItem, lang = 'name' }) {
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);

  useEffect(() => {
    // Determine whether this stock item has a name in the specified language
    setHasLanguage(stockItem[lang] !== undefined);
  }, [lang, stockItem]);

  return (
    <Card style={{ margin: 5 }}>
      <Card.Body>
        <Card.Title>
          {hasLanguage ? stockItem[lang] : stockItem.name}
        </Card.Title>

        <Card.Text>
          Amount: <b>{stockItem.count}</b>
        </Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          Last updated:{' '}
          {stockItem.timestamp !== undefined
            ? new Date(stockItem.timestamp).toDateString()
            : 'Unavailable'}
        </Card.Text>

        <Container
          style={{ display: 'flex', alignItems: 'center', padding: 0 }}
        >
          <Button size="sm" variant="info" style={{ alignSelf: 'center' }}>
            Edit amount
          </Button>
          <div style={{ margin: 'auto' }} />
          {!hasLanguage && <Badge variant="danger">Language unavailable</Badge>}
        </Container>
      </Card.Body>
    </Card>
  );
}

export default StockCard;
