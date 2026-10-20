import { test } from '@japa/runner';

test.group('Todos controller', () => {
  test('module loads', async () => {
    const mod = await import('#controllers/todos_controller');
    if (!mod.default) throw new Error('TodosController missing');
  });
});
