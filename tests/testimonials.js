const { expect } = require('chai');
const { faker } = require('@faker-js/faker');
const api = require('../utils/api');

describe('Testimonials', function () {
  this.timeout(30000);
  
  it('xxvii. Should POST /testimonials with faker data', async () => {
    const testimonial = {
      company_name: faker.company.name(),
      content: faker.lorem.paragraphs(2)
    };
    
    console.log('POST /testimonials:', testimonial.company_name);
    
    const res = await api.post('/testimonials', testimonial);
    
    console.log('Response status:', res.status);
    console.log('Response data:', JSON.stringify(res.data));
    
    expect(res.status, `POST failed: ${JSON.stringify(res.data)}`).to.be.oneOf([200, 201]);
    expect(res.data).to.be.an('object');
  });

  it('xxviii. Should GET /testimonials and return array', async () => {
    const res = await api.get('/testimonials');
    
    console.log('GET /testimonials status:', res.status);
    expect(res.status).to.equal(200);
    
    const testimonials = Array.isArray(res.data) ? res.data : res.data.data;
    expect(testimonials, 'Response should contain array').to.be.an('array');
    
    console.log(`✓ Found ${testimonials.length} testimonials`);
  });
});