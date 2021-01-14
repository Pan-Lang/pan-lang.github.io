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

  /**
   * If requested, shows stock count before and after order request
   */
  function getVisibleStockCount() {
    return requestedCount
      ? `${stockItem.count} → ${stockItem.count - requestedCount}`
      : stockItem.count;
  }

  return (
    <>
      <Fade in exit>
        <StockInfo
          stockItem={stockItem}
          languageTag={languageTag}
          hasLanguage={hasLanguage}
          handleShow={handleShow}
          showEnglishOnly={languageTag === 'en'}
          visibleStockCount={getVisibleStockCount()}
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
