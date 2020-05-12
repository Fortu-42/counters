import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
  // headers: {
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'Content-Type': 'multipart/form-data',
  // },
});
