const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

describe('Contact Endpoints', () => {
  beforeAll(async () => {
    await auth.ensureTestUserLoggedIn();
  });

  test('POST /contact - Add a new message', async () => {
    const contactData = DataFactory.createContact();
    const response = await apiClient.post('/contact', contactData);
    
    expect([200, 201]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });
});