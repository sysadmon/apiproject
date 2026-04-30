const apiClient = require('../utils/apiClient');
const auth = require('../utils/auth');
const DataFactory = require('../utils/dataFactory');

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 5000);

describe('Contact Endpoints', () => {
  beforeAll(async () => {
    await auth.ensureTestUserLoggedIn();
  });

  test('POST /contact - Attempt with invalid email address', async () => {
    const contactData = {
      name: process.env.CONTACT_TEST_1_NAME,
      email: process.env.CONTACT_TEST_1_EMAIL,
      phone_number: process.env.CONTACT_TEST_1_PHONE,
      message: process.env.CONTACT_TEST_1_MESSAGE
    };
    await expect(apiClient.post('/contact', contactData)).rejects.toHaveProperty('response.status', 422);
  });

  test('POST /contact - Send with email from .env file', async () => {
    const contactData = {
      name: process.env.CONTACT_TEST_2_NAME,
      email: process.env.CONTACT_TEST_2_EMAIL,
      phone_number: process.env.CONTACT_TEST_2_PHONE,
      message: process.env.CONTACT_TEST_2_MESSAGE
    };
    const response = await apiClient.post('/contact', contactData);
    expect([200, 201]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });

  test('POST /contact - Attempt with 5 digit phone number', async () => {
    const contactData = {
      name: process.env.CONTACT_TEST_3_NAME,
      email: process.env.CONTACT_TEST_3_EMAIL,
      phone_number: process.env.CONTACT_TEST_3_PHONE,
      message: process.env.CONTACT_TEST_3_MESSAGE
    };
    const response = await apiClient.post('/contact', contactData);
    expect([200, 201]).toContain(response.status);
    expect(response.data).toHaveProperty('message');
  });

  test('POST /contact - Attempt without an email address', async () => {
    const contactData = {
      name: process.env.CONTACT_TEST_4_NAME,
      phone_number: process.env.CONTACT_TEST_4_PHONE,
      message: process.env.CONTACT_TEST_4_MESSAGE
    };
    await expect(apiClient.post('/contact', contactData)).rejects.toHaveProperty('response.status', 422);
  });

  test('POST /contact - Attempt with email containing special character', async () => {
    const contactData = {
      name: process.env.CONTACT_TEST_5_NAME,
      email: process.env.CONTACT_TEST_5_EMAIL,
      phone_number: process.env.CONTACT_TEST_5_PHONE,
      message: process.env.CONTACT_TEST_5_MESSAGE
    };
    await expect(apiClient.post('/contact', contactData)).rejects.toHaveProperty('response.status', 422);
  });
});