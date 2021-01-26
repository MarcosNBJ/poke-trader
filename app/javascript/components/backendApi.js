import axios from 'axios';
import $ from 'jquery';

const backendApi = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content'),
  },
  validateStatus(status) {
    return status < 500;
  },
});

export default backendApi;
