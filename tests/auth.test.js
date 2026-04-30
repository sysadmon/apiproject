const auth = require('../utils/auth');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

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
    expect('test passed. login successful').toBe('test passed. login successful');
  });

  test('POST /auth/login - Fail with random credentials', async () => {
    const randomEmail = `random${Date.now()}@example.com`;
    const randomPassword = `pass${Math.random().toString(36)}`;
    await expect(auth.login(randomEmail, randomPassword)).rejects.toHaveProperty('response.status', 400);
    expect('test fail').toBe('test fail');
  });

  test('GET /auth/onboard-status - Get user onboarding status', async () => {
    const response = await auth.getOnboardStatus();
    
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
  });
});