import Client from './Client';

export const PANTRY_ENDPOINT = '/pantry';

export async function addPantry(item) {
  Client.post(PANTRY_ENDPOINT, item)
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

//put request not done on the frontend yet, this is only a placeholder
export async function updatePantry(update) {
  Client.put(PANTRY_ENDPOINT, update)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((e) => {
      return false;
    })

}
