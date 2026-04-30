const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

describe('Contact Endpoints', () => {
  beforeAll(async () => {
    await auth.registerAndLogin();
  });

  test('POST /contact - Add a new message', async () => {
    const contactData = DataFactory.createContact();
    const response = await apiClient.post('/contact', contactData);
    
    expect([200, 201]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });
});