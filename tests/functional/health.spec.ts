import { test } from '@japa/runner'

test.group('Health', () => {
  test('returns ok status', async ({ client }) => {
    const response = await client.get('/api/health')
    response.assertStatus(200)
    response.assertBodyContains({ status: 'ok' })
  })

  test('includes a timestamp', async ({ client }) => {
    const response = await client.get('/api/health')
    response.assertStatus(200)
    const body = response.body()
    if (typeof body !== 'object' || body === null) {
      throw new Error('Expected response body to be an object')
    }
    const timestamp = (body as Record<string, unknown>).timestamp
    if (typeof timestamp !== 'string') {
      throw new Error('Expected timestamp to be a string')
    }
    if (Number.isNaN(Date.parse(timestamp))) {
      throw new Error(`Expected timestamp to be a valid date, got: ${timestamp}`)
    }
  })
})