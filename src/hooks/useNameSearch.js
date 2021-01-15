import { useState } from 'react';

/**
 * Contains logic for searching stock items by English and translated names
 * @param {Array<{ name: String, translations: Object }>} stock list of stock items
 * @param {String} languageTag language tag, e.g. `en`, `es`, `zh-CN`, etc.
 */
function useNameSearch(stock, languageTag) {
  const [nameQuery, setNameQuery] = useState('');

  /**
   * Returns filtered stock array based on search queries
   * Name query: allows if EITHER English or translated name includes query
   * @return {Array<{ name: String, translations: Object }>} stock list of stock items
   * 
   */
  function getFilteredStockItems() {
    return stock.filter((item) => {
      // Check if query is included in English name
      const inEnglishName = item.name.toLowerCase().includes(nameQuery);

      let inTranslatedName = false;

      // Check first if translations have loaded
      let translations = item.translations;
      if (Boolean(translations) && translations[languageTag] !== undefined) {
        // Check if query is included in translated name
        inTranslatedName = item.translations[languageTag]
          .toLowerCase()
          .includes(nameQuery);
      }
      return inEnglishName || inTranslatedName;
    });
  }

  return [setNameQuery, getFilteredStockItems];
}

export default useNameSearch;
