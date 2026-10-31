import 'reflect-metadata'
import { Ignitor } from '@adonisjs/core'
import { apiClient } from '@japa/api-client'

const APP_ROOT = new URL('../', import.meta.url)

const ignitor = new Ignitor(APP_ROOT, {
  environment: process.env.NODE_ENV ?? 'test',
  importer: (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
      return import(new URL(filePath, APP_ROOT).href)
    }
    return import(filePath)
  },
})

ignitor
  .testRunner()
  .configure(async () => {
    const { configure } = await import('@japa/runner')
    await configure({
      files: [
        new URL('../tests/functional/health.spec.ts', import.meta.url).href,
        new URL('../tests/functional/todos.spec.ts', import.meta.url).href,
      ],
      plugins: [apiClient()],
      importer: (filePath) => import(filePath),
      forceExit: true,
    })
  })
  .run(async () => {
    const { run } = await import('@japa/runner')
    await run()
  })
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    process.exitCode = 1
    console.error(error)
  })