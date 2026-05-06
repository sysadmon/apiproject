const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('6. Help Center', function () {
  this.timeout(30000);
  
  it('xviii. Should GET /help-center/categories', async () => {
    const res = await api.get('/help-center/categories');
    
    console.log('GET /help-center/categories status:', res.status);
    expect(res.status).to.equal(200);
    
    const categories = Array.isArray(res.data) ? res.data : res.data.data;
    expect(categories, 'Response should contain array').to.be.an('array');
    
    console.log(`✓ Found ${categories.length} categories`);
  });
});
