const auth = require('../utils/auth');

describe('Auth Endpoints', () => {
  let testUser;

  beforeAll(async () => {
    auth.clearToken();
  });

  test('POST /auth/register - Register a new user', async () => {
    const { response, userData } = await auth.register();
    testUser = userData;
    
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('message');
    expect(userData.email).toContain('@yopmail.com');
  });

  test('POST /auth/login - Authenticate a user', async () => {
    const response = await auth.login(testUser.email, testUser.password);
    
    expect(response.status).toBe(200);
    expect(auth.getToken()).toBeTruthy();
  });

  test('GET /auth/onboard-status - Get user onboarding status', async () => {
    const response = await auth.getOnboardStatus();
    
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
});