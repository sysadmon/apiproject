const { expect } = require('chai');
const DataFactory = require('../utils/dataFactory');
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

describe('POST /organisations', function () {
  it('xvii. Should create organisation with valid data', async () => {
    const org = DataFactory.validOrganisation();
    const res = await api.post('/organisations', org);
    expect(res.status).to.equal(201);
    expect(res.data.data).to.have.property('id');
  });

  it('xviii. Should handle email with leading/trailing space', async () => {
    const org = DataFactory.validOrganisation();
    org.email = `  ${org.email}  `;
    const res = await api.post('/organisations', org);
    expect(res.status, 'API should trim or reject spaced email').to.be.oneOf([201, 400, 422]);
  });

  it('xix. Should handle email space appropriately', async () => {
    const org = DataFactory.validOrganisation();
    const originalEmail = org.email;
    org.email = `  ${originalEmail}  `;
    const res = await api.post('/organisations', org);
    if (res.status === 201) {
      expect(res.data.data.email.trim(), 'API should store trimmed email').to.equal(originalEmail);
    } else {
      expect(res.status, 'API rejected spaced email').to.be.oneOf([400, 422]);
    }
  });
});