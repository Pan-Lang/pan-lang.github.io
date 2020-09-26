import Client from './Client';

const STOCK_ENDPOINT = '/stock';

export async function fetchStock() {
  const promise = await Client.get(STOCK_ENDPOINT);
  return promise;
}

export async function createStockItem(item) {
  Client.post(STOCK_ENDPOINT, item)
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

export async function updateStockCount(id, updated) {
  Client.put(`${STOCK_ENDPOINT}/${id}`, updated)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((e) => {
      console.error(e)
      return false;
    })
}
