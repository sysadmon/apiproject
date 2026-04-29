const apiClient = require('./apiClient');
const DataFactory = require('./dataFactory');

class AuthManager {
  constructor() {
    this.token = null;
    this.currentUser = null;
    this.currentOrgId = null;
  }

  async register() {
    const userData = DataFactory.createUser();
    const response = await apiClient.post('/auth/register', userData);
    this.currentUser = userData;
    return { response, userData };
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