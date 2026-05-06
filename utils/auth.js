const axios = require('axios');
const { expect } = require('chai');
require('dotenv').config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 30000,
  validateStatus: () => true // Handle all statuses manually for better assertions
});

class Auth {
  constructor() {
    this.token = null;
  }

  async login(email = process.env.TEST_USER, password = process.env.TEST_USER_PASSWORD) {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.status === 200) {
        this.token = res.data.token || res.data.data?.token || res.data.access_token;
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      }
      return res;
    } catch (err) {
      throw new Error(`Login failed: ${err.message}`);
    }
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
    delete api.defaults.headers.common['Authorization'];
  }

  getApiClient() {
    return api;
  }

  async ensureAuth() {
    if (!this.token) {
      const res = await this.login();
      expect(res.status, 'Auto re-login failed').to.equal(200);
    }
  }
}

module.exports = new Auth();