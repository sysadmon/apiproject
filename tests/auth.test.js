const auth = require('../utils/auth');
require('dotenv').config();

jest.setTimeout(parseInt(process.env.TEST_TIMEOUT) || 30000);

describe('Auth Endpoints - Login Tests', () => {
  beforeEach(async () => {
    auth.clearToken();
  });

  // Test 1: Valid login with TEST_USER and TEST_USER_PASSWORD
  test('Test 1: POST /auth/login - Valid login with TEST_USER credentials', async () => {
    try {
      const response = await auth.login(process.env.TEST_USER, process.env.TEST_USER_PASSWORD);
      expect(response.status).toBe(200);
      expect(auth.getToken()).toBeTruthy();
      expect(response.data).toBeDefined();
      console.log('✓ Test 1 PASSED: Valid login successful');
    } catch (error) {
      console.log('✗ Test 1 FAILED: Valid login failed', error.response?.status);
      throw error;
    }
  });

  // Test 2: Invalid email (test@example.com) with password (pass1)
  test('Test 2: POST /auth/login - Invalid email test@example.com with password pass1', async () => {
    const testEmail = process.env.LOGIN_TEST_2_EMAIL;
    const testPassword = process.env.LOGIN_TEST_2_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 2 FAILED: Should have rejected invalid credentials');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBe(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 2 PASSED: Invalid credentials correctly rejected with status 400');
    }
  });

  // Test 3: Username format (try.com) instead of email with password (try)
  test('Test 3: POST /auth/login - Username format try.com with password try', async () => {
    const testEmail = process.env.LOGIN_TEST_3_EMAIL;
    const testPassword = process.env.LOGIN_TEST_3_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 3 FAILED: Should have rejected username format instead of email');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 3 PASSED: Username format correctly rejected');
    }
  });

  // Test 4: Very long email (265 characters) with password (password1)
  test('Test 4: POST /auth/login - Very long email (265 characters) with password password1', async () => {
    const testEmail = process.env.LOGIN_TEST_4_EMAIL;
    const testPassword = process.env.LOGIN_TEST_4_PASSWORD;
    
    expect(testEmail.length).toBe(265);
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 4 FAILED: Should have rejected very long email');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 4 PASSED: Very long email correctly rejected with status', error.response?.status);
    }
  });

  // Test 5: Email with special characters (test+special.chars-123@example.com) with password (pass123)
  test('Test 5: POST /auth/login - Email with special characters test+special.chars-123@example.com with password pass123', async () => {
    const testEmail = process.env.LOGIN_TEST_5_EMAIL;
    const testPassword = process.env.LOGIN_TEST_5_PASSWORD;
    
    expect(testEmail).toContain('+');
    expect(testEmail).toContain('-');
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 5 FAILED: Should have rejected email with special characters');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 5 PASSED: Email with special characters correctly rejected with status', error.response?.status);
    }
  });

  // Test 6: Valid email format (validuser@example.com) with weak password (123)
  test('Test 6: POST /auth/login - Valid email validuser@example.com with weak password 123', async () => {
    const testEmail = process.env.LOGIN_TEST_6_EMAIL;
    const testPassword = process.env.LOGIN_TEST_6_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 6 FAILED: Should have rejected weak password');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 6 PASSED: Weak password correctly rejected with status', error.response?.status);
    }
  });

  // Test 7: Invalid numeric email (12345@example.com) with password (password1)
  test('Test 7: POST /auth/login - Invalid numeric email 12345@example.com with password password1', async () => {
    const testEmail = process.env.LOGIN_TEST_7_EMAIL;
    const testPassword = process.env.LOGIN_TEST_7_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 7 FAILED: Should have rejected numeric email');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 7 PASSED: Numeric email correctly rejected with status', error.response?.status);
    }
  });

  // Test 8: Valid email (anotheruser@example.com) with single character password (A)
  test('Test 8: POST /auth/login - Valid email anotheruser@example.com with single character password A', async () => {
    const testEmail = process.env.LOGIN_TEST_8_EMAIL;
    const testPassword = process.env.LOGIN_TEST_8_PASSWORD;
    
    expect(testPassword.length).toBe(1);
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 8 FAILED: Should have rejected single character password');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 8 PASSED: Single character password correctly rejected with status', error.response?.status);
    }
  });

  // Test 9: Valid email format (tryusera@yahoo.com) with password (Password123!)
  test('Test 9: POST /auth/login - Valid email format tryusera@yahoo.com with password Password123!', async () => {
    const testEmail = process.env.LOGIN_TEST_9_EMAIL;
    const testPassword = process.env.LOGIN_TEST_9_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 9 FAILED: Should have failed (user not registered)');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 9 PASSED: Unregistered user correctly rejected with status', error.response?.status);
    }
  });

  // Test 10: Valid email format (tryuserb@gmail.com) with password (Password123!)
  test('Test 10: POST /auth/login - Valid email format tryuserb@gmail.com with password Password123!', async () => {
    const testEmail = process.env.LOGIN_TEST_10_EMAIL;
    const testPassword = process.env.LOGIN_TEST_10_PASSWORD;
    
    try {
      await auth.login(testEmail, testPassword);
      console.log('✗ Test 10 FAILED: Should have failed (user not registered)');
      throw new Error('Expected login to fail but it succeeded');
    } catch (error) {
      expect(error.response?.status).toBeGreaterThanOrEqual(400);
      expect(error.response?.data).toBeDefined();
      console.log('✓ Test 10 PASSED: Unregistered user correctly rejected with status', error.response?.status);
    }
  });
});