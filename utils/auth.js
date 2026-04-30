const apiClient = require('./apiClient');
const DataFactory = require('./dataFactory');
require('dotenv').config();

class AuthManager {
  constructor() {
    this.token = null;
    this.currentUser = null;
    this.currentOrgId = null;
  }

  async register(email, password, username, first_name, last_name, phone_number) {
    // If called with no parameters, use DataFactory (for backward compatibility)
    if (!email) {
      const userData = DataFactory.createUser();
      const response = await apiClient.post('/auth/register', userData);
      this.currentUser = userData;
      return { response, userData };
    }

    // Otherwise, use provided parameters
    const userData = {
      email: email || '',
      password: password || '',
      username: username || '',
      first_name: first_name || '',
      last_name: last_name || '',
      phone_number: phone_number || ''
    };

    const response = await apiClient.post('/auth/register', userData);
    this.currentUser = userData;
    return response;
  }

  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    
    // Adjust based on actual API response structure
    this.token = response.data.token || response.data.data?.token || response.data.access_token;
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    
    return response;
  }

  async registerAndLogin() {
    const { userData } = await this.register();
    await this.login(userData.email, userData.password);
    return userData;
  }

  async loginWithTestUser() {
    await this.login(process.env.TEST_USER, process.env.TEST_USER_PASSWORD);
  }

  async ensureTestUserLoggedIn() {
    try {
      await this.login(process.env.TEST_USER, process.env.TEST_USER_PASSWORD);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Register the test user
        const userData = {
          username: process.env.TEST_USER.split('@')[0],
          email: process.env.TEST_USER,
          password: process.env.TEST_USER_PASSWORD,
          first_name: 'Test',
          last_name: 'User',
          phone_number: '+2341234567890'
        };
        await apiClient.post('/auth/register', userData);
        await this.login(process.env.TEST_USER, process.env.TEST_USER_PASSWORD);
      } else {
        throw error;
      }
    }
  }

  async getOnboardStatus() {
    return apiClient.get('/auth/onboard-status');
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
    delete apiClient.defaults.headers.common['Authorization'];
  }

  setOrgId(orgId) {
    this.currentOrgId = orgId;
  }

  getOrgId() {
    return this.currentOrgId;
  }
}

// Singleton so token is shared across all test files
module.exports = new AuthManager();