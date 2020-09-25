import axios from 'axios';

const BASE_API_URL = 'https://panlang.herokuapp.com';

export default axios.create({
  baseURL: BASE_API_URL,
});
