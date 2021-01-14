import React, { useState } from 'react';
import Fade from '@material-ui/core/Fade';
import OrderModal from './OrderModal';
import StockInfo from './StockInfo';
import useLanguage from '../hooks/useLanguage';

/**
 * Stock item card on order screen
 */
function StockOrderCard({
  stockItem,
  getStock,
  languageTag = 'en',
  onRequest,
  requestedCount = 0,
}) {
  const [showOrderModal, setShowAmountModal] = useState(false);
  const hasLanguage = useLanguage(languageTag, stockItem);

  // Handlers for showing/closing modal when ordering item
  const handleClose = () => setShowAmountModal(false);
  const handleShow = () => setShowAmountModal(true);

  return (
    <>
      <Fade in exit>
        <StockInfo
          stockItem={stockItem}
          languageTag={languageTag}
          hasLanguage={hasLanguage}
          handleShow={handleShow}
          showEnglishOnly={languageTag === 'en'}
          visibleStockCount={
            requestedCount
              ? `${stockItem.count} → ${stockItem.count - requestedCount}`
              : stockItem.count
          }
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
