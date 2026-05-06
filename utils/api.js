require('dotenv').config();
const axios = require('axios');

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  validateStatus: () => true
});

module.exports = api;