import Client from './Client';

const STOCK_ENDPOINT = '/stock';

export async function fetchStock(uid) {
  return await Client.get(`${STOCK_ENDPOINT}?pantry=${uid}`);
}

export async function createStockItem(item) {
  return await Client.post(STOCK_ENDPOINT, item)
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

export async function updateStockCount(updatedItem) {

  return await Client.put(STOCK_ENDPOINT, updatedItem)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((e) => {
      console.error(e)
      return false;
    })
}
