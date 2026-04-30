const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

describe('Channel Endpoints', () => {
  beforeAll(async () => {
    await auth.ensureTestUserLoggedIn();
    // Create org if not exists from previous test
    if (!auth.getOrgId()) {
      const org = await apiClient.post('/organisations', DataFactory.createOrganisation());
      auth.setOrgId(org.data.data.id);
    }
  });

  test('POST /channels - Create a new channel', async () => {
    const channelData = DataFactory.createChannel(auth.getOrgId());
    const response = await apiClient.post('/channels', channelData);
    
    expect(response.status).toBe(201);
    expect(response.data.data).toHaveProperty('id');
    expect(response.data.data.organisation_id).toBe(auth.getOrgId());
  });

  test('GET /channels - View all channels', async () => {
    const response = await apiClient.get('/channels');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});