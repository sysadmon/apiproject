require('dotenv').config();
const { expect } = require('chai');
// ... rest
//const { expect } = require('chai');
const DataFactory = require('../utils/dataFactory');
const auth = require('../utils/auth');
const api = auth.getApiClient();
//require('dotenv').config();
describe('Auth Endpoints', function () {
  let authToken;

  before(async function () {
    this.timeout(30000);
    console.log('\n=== AUTH LOGIN DEBUG ===');
    console.log('Email:', process.env.TEST_USER);
    
    const res = await api.post('/auth/login', {
      email: process.env.TEST_USER,
      password: process.env.TEST_USER_PASSWORD
    });

    console.log('Login status:', res.status);
    console.log('Login response:', JSON.stringify(res.data, null, 2));
    
    expect(res.status, `Login failed: ${JSON.stringify(res.data)}`).to.equal(200);
    
    authToken = res.data.token 
             || res.data.access_token 
             || res.data.accessToken 
             || res.data.jwt 
             || res.data.authToken
             || res.data.data?.token 
             || res.data.data?.access_token
             || res.data.data?.accessToken;
             
    console.log('Extracted token:', authToken ? authToken.substring(0, 20) + '...' : 'NONE');
    console.log('========================\n');
    
    expect(authToken, `No token found in response. Keys: ${Object.keys(res.data || {}).join(', ')}`).to.be.a('string');
    api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  });

  describe('POST /auth/register', () => {
    it('ii. Should register user with all valid entries', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const user = DataFactory.validUser();
      const res = await api.post('/auth/register', user);
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status).to.equal(201);
    });

    it('iii. Should reject email domain yopmail.com from .env', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const user = DataFactory.validUser();
      user.email = process.env.INVALID_EMAIL_DOMAIN; // This sets email to "yopmail.com"
      
      console.log('Attempting register with invalid email:', user.email);
      
      const res = await api.post('/auth/register', user);
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      
      // Test passes if API correctly rejects with 400
      expect(res.status, `API should reject "${user.email}" with 400 but got ${res.status}`).to.equal(400);
      expect(res.data).to.have.property('message');
      
      console.log('✓ Test passed: API correctly rejected invalid email with 400');
    });

    it('iv. Should reject email with special character @@', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const user = DataFactory.validUser();
      user.email = `test@@example.com`; // Double @ - invalid format
      
      console.log('Testing invalid email with @@:', user.email);
      
      const res = await api.post('/auth/register', user);
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      
      // Test passes if API correctly rejects with 400 or 422
      expect(res.status, `API should reject "${user.email}" but got ${res.status}`).to.be.oneOf([400, 422]);
      expect(res.data).to.have.property('message');
      expect(res.data.message.toLowerCase()).to.include('email');
      
      console.log(`✓ Test passed: API correctly rejected email with @@ using ${res.status}`);
    });

    it('v. Should handle leading/trailing space in email', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const user = DataFactory.userWithSpacedEmail();
      const res = await api.post('/auth/register', user);
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status, 'API should either trim or reject spaced email').to.be.oneOf([201, 400, 422]);
    });
  });

    describe('POST /auth/login', () => {
    it('vi. Should login with TEST_USER from .env', async () => {
      console.log('Email:', process.env.TEST_USER);
      console.log('Password:', process.env.TEST_USER_PASSWORD ? '***' : 'undefined');
      
      const res = await api.post('/auth/login', {
        email: process.env.TEST_USER,
        password: process.env.TEST_USER_PASSWORD
      });
      
      console.log('Status:', res.status);
      console.log('Response:', res.data);
      
      expect(res.status).to.equal(200);
    });

    it('vii. Should reject unregistered user login', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const fakeEmail = DataFactory.validUser().email;
      const res = await api.post('/auth/login', { email: fakeEmail, password: 'random123' });
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status, 'API should reject unknown user').to.be.oneOf([401, 400, 404]);
    });

    it('vii. Should reject blank username and password', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const res = await api.post('/auth/login', { email: '', password: '' });
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status, 'API should validate required fields').to.be.oneOf([400, 422]);
    });
  });

  describe('POST /auth/password-reset', () => {
    it('ix. Should request reset for valid TEST_USER email', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const res = await api.post('/auth/password-reset', { email: process.env.TEST_USER });
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status).to.be.oneOf([200, 202]);
    });

    it('x. Should reject password reset for unregistered email', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const res = await api.post('/auth/password-reset', { email: DataFactory.validUser().email });
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status, 'API should not leak user existence or should reject').to.be.oneOf([400, 404, 200]);
    });

    it('xi. Should reject password reset when email is missing', async () => {
      const originalAuth = api.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
      
      const res = await api.post('/auth/password-reset', {});
      
      api.defaults.headers.common['Authorization'] = originalAuth;
      expect(res.status, 'API should require email field').to.be.oneOf([400, 422]);
    });
  });

  describe('GET /auth/onboard-status', () => {
    it('xi. Should get onboard status for logged in user', async () => {
      const res = await api.get('/auth/onboard-status');
      expect(res.status, 'Onboard status should succeed for auth user').to.equal(200);
    });
  });
});