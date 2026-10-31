import { test } from '@japa/runner'

test.group('Todos', () => {
  test('lists todos as an array', async ({ client }) => {
    const response = await client.get('/api/todos')
    response.assertStatus(200)
    const body = response.body()
    if (!Array.isArray(body)) {
      throw new Error('Expected response body to be an array')
    }
  })

  test('rejects empty title with 422', async ({ client }) => {
    const response = await client.post('/api/todos').json({ title: '' })
    response.assertStatus(422)
  })

  test('rejects missing title with 422', async ({ client }) => {
    const response = await client.post('/api/todos').json({})
    response.assertStatus(422)
  })

  test('rejects title longer than 200 chars with 422', async ({ client }) => {
    const response = await client.post('/api/todos').json({
      title: 'a'.repeat(201),
    })
    response.assertStatus(422)
  })

  test('rejects non-string title with 422', async ({ client }) => {
    const response = await client.post('/api/todos').json({ title: 123 })
    response.assertStatus(422)
  })

  test('returns 404 for unknown todo id', async ({ client }) => {
    const response = await client.delete('/api/todos/999999')
    response.assertStatus(404)
  })
})