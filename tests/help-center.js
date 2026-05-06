const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('6. Help Center', function () {
  this.timeout(30000);
  
  it('xvii. Should POST /help-center/categories with faker data', async () => {
    const category = {
      name: faker.commerce.department(),
      description: faker.lorem.sentence()
    };
    
    console.log('POST /help-center/categories:', category.name);
    
    const res = await api.post('/help-center/categories', category);
    
    console.log('Response status:', res.status);
    console.log('Response data:', JSON.stringify(res.data));
    
    expect(res.status, `POST failed: ${JSON.stringify(res.data)}`).to.be.oneOf([200, 201]);
    expect(res.data).to.be.an('object');
  });

  it('xviii. Should GET /help-center/categories', async () => {
    const res = await api.get('/help-center/categories');
    
    console.log('GET /help-center/categories status:', res.status);
    expect(res.status).to.equal(200);
    
    const categories = Array.isArray(res.data) ? res.data : res.data.data;
    expect(categories, 'Response should contain array').to.be.an('array');
    
    console.log(`✓ Found ${categories.length} categories`);
  });
});