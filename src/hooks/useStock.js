import { useEffect, useState } from 'react';
import { fetchStock } from '../api/Stock';
import { auth } from '../firebase';

/**
 * Handles state of fetching stock items from API
 * @return {[Array, Boolean, Error, Function]}
 */
function useStock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches stock from API and stores in state
   * @param {Number} timeout ms to wait before fetching stock
   */
  function getStock(timeout = 0) {
    // Set stock empty to begin loading spinner
    setStock([]);
    setError(null);
    setLoading(true);

    // Fetch stock after designated time
    setTimeout(() => {
      fetchStock(auth.currentUser.uid)
        .then((res) => {
          setStock(res.data);
          console.log(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
        });
    }, timeout);
  }

  /**
   * Fetch stock as soon as page is rendered, if user is signed in
   */
  useEffect(() => {
    if (Boolean(auth.currentUser)) {
      getStock();
    }
  }, []);

  // Return state of stock
  return [stock, loading, error, getStock];
}

export default useStock;