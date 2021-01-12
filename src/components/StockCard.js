import React, { useEffect, useState } from 'react';
import Fade from '@material-ui/core/Fade';
import StockModal from './StockModal';
import StockInfo from './StockInfo';

/**
 * Card component that displays a stock item and allows
 * for editing its amount through a modal popup
 */
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
    <>
      <Fade in={true}>
        <StockInfo
          stockItem={stockItem}
          lang={lang}
          hasLanguage={hasLanguage}
          handleShow={handleShow}
        />
      </Fade>

      {/* Popup modal for editing stock count */}
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

export default StockCard;
