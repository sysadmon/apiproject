const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('Testimonials', function () {
  this.timeout(30000);
  
  it('xxviii. Should GET /testimonials and return array', async () => {
    const res = await api.get('/testimonials');
    
    console.log('GET /testimonials status:', res.status);
    expect(res.status).to.equal(200);
    
    const testimonials = Array.isArray(res.data) ? res.data : res.data.data;
    expect(testimonials, 'Response should contain array').to.be.an('array');
    
    console.log(`✓ Found ${testimonials.length} testimonials`);
  });
});
