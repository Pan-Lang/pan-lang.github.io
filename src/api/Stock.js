import axios from 'axios';

const BASE_API_URL = 'https://enigmatic-cove-28074.herokuapp.com';

export default async function fetchStock() {
  return await axios.get(BASE_API_URL + '/stock');
}