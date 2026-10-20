import 'reflect-metadata';
import { Ignitor } from '@adonisjs/core';

const ignitor = new Ignitor(new URL('../', import.meta.url), {
  environment: process.env.NODE_ENV ?? 'test',
});

ignitor
  .testRunner()
  .run(async () => {
    const { default: testSuite } = await import('@japa/runner');
    await testSuite.boot();
  })
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    process.exitCode = 1;
    console.error(error);
  });
