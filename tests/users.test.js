const { expect } = require('chai');
const auth = require('../utils/auth');
const api = auth.getApiClient();
require('dotenv').config();

before(async function () {
  this.timeout(30000);
  const res = await api.post('/auth/login', {
    email: process.env.TEST_USER,
    password: process.env.TEST_USER_PASSWORD
  });
  expect(res.status, 'Initial login failed - check .env credentials').to.equal(200);
  
  const token = res.data.token || res.data.access_token || res.data.accessToken || res.data.jwt || res.data.data?.token || res.data.data?.access_token;
  expect(token, 'No token in login response').to.be.a('string');
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
});

describe('Users Endpoints', function () {
  it('xx. GET /users/organisations - Verify user organisation', async () => {
    const res = await api.get('/users/organisations');
    expect(res.status).to.equal(200);
    expect(res.data).to.have.property('data');
  });

  it('xxi. GET /users/me - Retrieve current user', async () => {
    const res = await api.get('/users/me');
    expect(res.status).to.equal(200);
    
    // Handle different response shapes: data.email, data.user.email, or user.email
    const userEmail = res.data.data?.email || res.data.data?.user?.email || res.data.user?.email || res.data.email;
    expect(userEmail, 'Response should contain user email').to.equal(process.env.TEST_USER);
  });

  it('xxii. GET /users - Retrieve list of users', async () => {
    const res = await api.get('/users');
    expect(res.status).to.equal(200);
    const users = res.data.data || res.data.users || res.data;
    expect(users).to.be.an('array');
  });
});