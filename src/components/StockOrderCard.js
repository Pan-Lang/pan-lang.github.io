import React, { useState, useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import OrderModal from './OrderModal';
import StockInfo from './StockInfo';

/**
 * Stock item card on order screen
 */
function StockOrderCard({
  stockItem,
  getStock,
  lang = 'name',
  onRequest,
  isRequested = false,
}) {
  const [showOrderModal, setShowAmountModal] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowAmountModal(false);
  const handleShow = () => setShowAmountModal(true);

  // Determine whether this stock item has a name in the specified language
  useEffect(() => {
    setHasLanguage(stockItem[lang] !== undefined);
  }, [lang, stockItem]);

  return (
    <>
      <Fade in exit>
        <StockInfo
          stockItem={stockItem}
          lang={lang}
          hasLanguage={hasLanguage}
          handleShow={handleShow}
          disableClick={stockItem.count <= 0}
        />
      </Fade>

      <OrderModal
        show={showOrderModal}
        handleClose={handleClose}
        getStock={getStock}
        stockName={stockItem.name}
        stockId={stockItem._id}
        stockCount={stockItem.count}
        onRequest={onRequest}
      />
    </>
  );
}

export default StockOrderCard;
