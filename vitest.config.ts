import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.spec.ts'],
    exclude: [
      'tests/functional/health.spec.ts',
      'tests/functional/todos.spec.ts',
    ],
    globals: true,
  },
})