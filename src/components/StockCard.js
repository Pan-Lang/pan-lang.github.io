import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

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
          {lang !== 'name' && hasLanguage ? " (" + stockItem['name'] + ")" : ""}
        </Card.Title>
        <Card.Text>Amount: {stockItem.count}</Card.Text>
        <Card.Text style={{ textAlign: 'right' }}>
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
