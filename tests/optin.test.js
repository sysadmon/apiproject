const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('Squeeze/Optin', function () {
  this.timeout(30000);
  
  it('xxii. Should POST /optin with valid faker data', async () => {
    const optin = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email().toLowerCase()
    };
    
    console.log('POST /optin:', optin.first_name, optin.last_name, optin.email);
    
    const res = await api.post('/optin', optin);
    
    console.log('Response status:', res.status);
    console.log('Response data:', JSON.stringify(res.data));
    
    expect(res.status, `POST failed: ${JSON.stringify(res.data)}`).to.be.oneOf([200, 201]);
    expect(res.data).to.be.an('object');
  });

  it('xxiii. Should reject /optin with double @@ email', async () => {
    const username = faker.internet.userName().toLowerCase();
    const domain = faker.internet.domainName();
    const optin = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: `${username}@@${domain}`
    };
    
    console.log('Testing invalid optin email:', optin.email);
    
    const res = await api.post('/optin', optin);
    
    console.log('Response status:', res.status);
    console.log('Error message:', res.data?.message);
    
    expect(res.status, `Should reject "${optin.email}"`).to.be.oneOf([400, 422]);
    expect(res.data).to.have.property('message');
  });
});