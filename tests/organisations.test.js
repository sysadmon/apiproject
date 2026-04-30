const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

describe('Organisation Endpoints', () => {
  beforeAll(async () => {
    await auth.ensureTestUserLoggedIn();
  });

  test('POST /organisations - Create a new organisation', async () => {
    const orgData = DataFactory.createOrganisation();
    const response = await apiClient.post('/organisations', orgData);
    
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('data');
    expect(response.data.data).toHaveProperty('id');
    
    // Store for channel tests
    auth.setOrgId(response.data.data.id);
  });
});