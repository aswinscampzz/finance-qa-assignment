const { test, expect, request } = require('@playwright/test');

test.describe('Reqres API Tests', () => {

  let apiContext;

  test.beforeAll(async () => {

    apiContext = await request.newContext({
      baseURL: 'https://reqres.in',

      extraHTTPHeaders: {
        'x-api-key': 'free_user_3F8InaAlWWXLIcby4NKorQhoKzW'
      }
    });

  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  // TC_API_001 - Get Users List
  test('TC_API_001 - Get Users List', async () => {

    const response = await apiContext.get('/api/users?page=2');

    console.log('STATUS:', response.status());

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);

    console.log(body);
  });

  // TC_API_002 - Successful Login
  test('TC_API_002 - Successful Login', async () => {

    const response = await apiContext.post('/api/login', {

      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      }

    });

    console.log('STATUS:', response.status());

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    console.log(body);
  });

  // TC_API_003 - Login Without Password
  test('TC_API_003 - Login Without Password', async () => {

    const response = await apiContext.post('/api/login', {

      data: {
        email: 'peter@klaven'
      }

    });

    console.log('STATUS:', response.status());

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body.error).toContain('Missing password');

    console.log(body);
  });

});