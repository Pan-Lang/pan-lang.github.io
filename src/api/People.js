
import Client from './Client';

export const PEOPLE_ENDPOINT = '/people';

export async function addPersonInfo(item) {
  Client.post(PEOPLE_ENDPOINT, item)
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

export async function fetchPeople(pantry, month, year) {
  let query = "?pantry=" + pantry + "&month=" + month + "&year=" + year;
  console.log(PEOPLE_ENDPOINT + query)
  const promise = await Client.get(PEOPLE_ENDPOINT + query);
  return promise;
}

export async function updatePerson(update) {
  Client.put(PEOPLE_ENDPOINT, update)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((e) => {
      return false;
    });
}
