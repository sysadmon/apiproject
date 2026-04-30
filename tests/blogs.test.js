const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

describe('Blog Endpoints', () => {
  beforeAll(async () => {
    await auth.ensureTestUserLoggedIn();
  });

  test('GET /blog_categories - Get all blog categories', async () => {
    const response = await apiClient.get('/blog_categories');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.data)).toBe(true);
  });

  test('GET /blogs - Get all blogs', async () => {
    const response = await apiClient.get('/blogs');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});