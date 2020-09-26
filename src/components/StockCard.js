import React, { useEffect, useState } from 'react';
import { Button, Badge, Container, Card } from 'react-bootstrap';

function StockCard({ stockItem, lang = 'name' }) {
  const [hasLanguage, setHasLanguage] = useState(false);

  useEffect(() => {
    setHasLanguage(stockItem[lang] !== undefined);
  }, [lang, stockItem]);

  return (
    <Card style={{ margin: 5 }}>
      <Card.Body>
        <Card.Title>
          {hasLanguage ? stockItem[lang] : stockItem.name}
        </Card.Title>
        <Card.Text>Amount: {stockItem.count}</Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
          Last updated:{' '}
          {stockItem.timestamp !== undefined
            ? new Date(stockItem.timestamp).toDateString()
            : 'Unavailable'}
        </Card.Text>
        <Container
          fluid
          style={{ display: 'flex', flexDirection: 'row-reverse' }}
        >
          <Button size="sm" style={{ alignSelf: 'center' }}>
            Edit amount
          </Button>
          {!hasLanguage && (
            <Badge variant="danger">Language unavailable: {lang}</Badge>
          )}
        </Container>
      </Card.Body>
    </Card>
  );
}

export default StockCard;
