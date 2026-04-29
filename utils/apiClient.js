const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: parseInt(process.env.TEST_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Log requests in test mode for debugging
apiClient.interceptors.request.use(request => {
  if (process.env.NODE_ENV === 'test') {
    console.log(`--> ${request.method.toUpperCase()} ${request.url}`);
  }
  return request;
});

apiClient.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'test') {
      console.log(`<-- ${response.status} ${response.config.url}`);
    }
    return response;
  },
  error => {
    if (process.env.NODE_ENV === 'test' && error.response) {
      console.log(`<-- ${error.response.status} ${error.config.url}`, error.response.data);
    }
    return Promise.reject(error);
  }
);

module.exports = apiClient;