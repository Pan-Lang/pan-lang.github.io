import { useState, useEffect } from 'react';

/**
 * Checks whether given stock item contains a translation
 * @param {String} languageTag Tag (`en`, `es`, etc.) specifying language of translation
 * @param {Object} stockItem single stock item from API
 */
function useLanguage(languageTag, stockItem) {
  const [hasLanguage, setHasLanguage] = useState(false);

  // Determine whether stock item has translation in specified language
  useEffect(() => {
    // Check that translations are present
    const translationsLoaded = Boolean(stockItem.translations);

    // Check if translation in specified language is present
    setHasLanguage(
      translationsLoaded && stockItem.translations[languageTag] !== undefined
    );
  }, [languageTag, stockItem]);

  return hasLanguage;
}

export default useLanguage;
