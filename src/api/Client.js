import axios from 'axios';

export const BASE_API_URL = 'http://localhost:3000' //'https://panlang.herokuapp.com';

export default axios.create({
  baseURL: BASE_API_URL,
});
