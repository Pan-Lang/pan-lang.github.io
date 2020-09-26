import Client from './Client';

const PEOPLE_ENDPOINT = '/person';

export async function fetchPeople() {
  const promise = await Client.get(PERSON_ENDPOINT);
  return promise;
}