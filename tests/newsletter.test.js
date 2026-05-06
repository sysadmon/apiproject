const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('Newsletter', function () {
  this.timeout(30000);
  
  it('xix. Should POST /newsletter with faker email', async () => {
    const payload = {
      email: faker.internet.email().toLowerCase()
    };
    
    console.log('POST /newsletter:', payload.email);
    
    const res = await api.post('/newsletter', payload);
    
    console.log('Response status:', res.status);
    expect(res.status, `POST failed: ${JSON.stringify(res.data)}`).to.be.oneOf([200, 201]);
  });

  it('xx. Should reject email with double @@ sign', async () => {
    const username = faker.internet.userName().toLowerCase();
    const domain = faker.internet.domainName();
    const payload = {
      email: `${username}@@${domain}`
    };
    
    console.log('Testing invalid email:', payload.email);
    
    const res = await api.post('/newsletter', payload);
    
    console.log('Response status:', res.status);
    console.log('Error message:', res.data?.message);
    
    expect(res.status, `Should reject "${payload.email}"`).to.be.oneOf([400, 422]);
    expect(res.data).to.have.property('message');
  });

  it('xxi. Should handle email with leading/trailing space', async () => {
    const email = faker.internet.email().toLowerCase();
    const payload = {
      email: `  ${email}  `
    };
    
    console.log('Testing spaced email:', JSON.stringify(payload.email));
    
    const res = await api.post('/newsletter', payload);
    
    console.log('Response status:', res.status);
    console.log('Response data:', JSON.stringify(res.data));
    
    expect(res.status, 'Should accept or reject spaced email').to.be.oneOf([200, 201, 400, 422]);
    
    if (res.status === 200 || res.status === 201) {
      console.log('✓ API accepted and likely trimmed email');
    } else {
      console.log(`✓ API rejected spaced email with ${res.status}`);
    }
  });
});