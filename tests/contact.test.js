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

describe('POST /contact', function () {
  it('xii. Should create contact with valid data, phone < 20', async () => {
    const contact = DataFactory.validContact();
    expect(contact.phone_number.length).to.be.lessThan(20);
    const res = await api.post('/contact', contact);
    expect(res.status).to.be.oneOf([200, 201]);
  });

  it('xiii. Should reject invalid email yopmail.com', async () => {
    const contact = DataFactory.validContact();
    contact.email = process.env.INVALID_EMAIL_DOMAIN;
    
    console.log('Attempting contact create with invalid email:', contact.email);
    
    const res = await api.post('/contact', contact);
    
    expect(res.status, `API should reject "${contact.email}" with 422 but got ${res.status}`).to.equal(422);
    expect(res.data).to.have.property('message');
    
    console.log('✓ Test passed: API correctly rejected invalid email with 422');
  });
  

  it('xiv. Should reject phone number with 21 digits', async () => {
    const contact = DataFactory.validContact();
    contact.phone_number = '+234123456789012345678'; // 22 characters - exceeds limit of 20
    
    console.log('Phone length:', contact.phone_number.length);
    console.log('Phone value:', contact.phone_number);
    
    const res = await api.post('/contact', contact);
    
    // Test passes if API correctly rejects with 400 or 422
    expect(res.status, `Expected 400/422 for phone length ${contact.phone_number.length} but got ${res.status}`).to.be.oneOf([400, 422]);
    expect(res.data).to.have.property('message');
    expect(res.data.message.toLowerCase(), 'Error should mention phone/length').to.satisfy(msg => 
      msg.includes('phone') || msg.includes('length') || msg.includes('invalid') || msg.includes('long')
    );
    
    console.log(`✓ Test passed: API correctly rejected phone >20 chars with ${res.status}`);
  });


  it('xv. Should handle email with leading/trailing space', async () => {
    const contact = DataFactory.validContact();
    contact.email = `  ${contact.email}  `;
    const res = await api.post('/contact', contact);
    expect(res.status, 'API should trim or reject spaced email').to.be.oneOf([200, 201, 422]);
  });

  it('xvi. Should reject blank email', async () => {
    const contact = DataFactory.validContact();
    contact.email = '';
    const res = await api.post('/contact', contact);
    expect(res.status, 'API should require email').to.equal(422);
  });
});
