import type { ApiClient } from '@japa/api-client'

declare module '@japa/runner/core' {
  interface TestContext {
    client: ApiClient
  }
}

export {}