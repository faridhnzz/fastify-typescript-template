import app from '../src/app';
import { test, describe, expect } from 'vitest';

describe('Server', () => {
  test('Should return server instance', async () => {
    expect(typeof app).eq('object');
    await app.close();
  });
});
