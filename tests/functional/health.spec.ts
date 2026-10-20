import { test } from '@japa/runner';

test.group('Health controller', () => {
  test('module loads', async () => {
    const mod = await import('#controllers/health_controller');
    if (!mod.default) throw new Error('HealthController missing');
  });
});
