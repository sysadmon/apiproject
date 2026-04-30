const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

describe('Organisation Endpoints', () => {
  beforeAll(async () => {
    await auth.registerAndLogin();
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