import axios from 'axios';

export const BASE_API_URL = 'https://us-central1-pan-lang.cloudfunctions.net/';

export default axios.create({
  baseURL: BASE_API_URL,
});
