import app from '../../src/app';
import { describe, test, expect } from 'vitest';

describe('GET /', () => {
  test('Should return body', async () => {
    const response = await app.inject({
      method: 'GET',
      path: '/',
    });
    expect(response.statusCode).eq(200);
    expect(response.body);
  });
});
