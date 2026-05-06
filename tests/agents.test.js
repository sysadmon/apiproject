const { expect } = require('chai');
const api = require('../utils/api');

describe(' System Agents', function () {
  this.timeout(30000);
  
  it('i. Should GET /agents', async () => {
    const res = await api.get('/agents');
    
    console.log('GET /agents status:', res.status);
    expect(res.status).to.equal(200);
    
    const agents = Array.isArray(res.data) ? res.data : res.data.data;
    expect(agents, 'Response should contain array').to.be.an('array');
    
    console.log(`✓ Found ${agents.length} agents`);
  });
});