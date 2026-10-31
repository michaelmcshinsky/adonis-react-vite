export interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface HealthStatus {
  status: string
  timestamp: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const message = body?.message ?? `Request failed with status ${response.status}`
    throw new ApiError(message, response.status, body?.errors)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const api = {
  getHealth: () => request<HealthStatus>('/api/health'),

  listTodos: () => request<Todo[]>('/api/todos'),

  createTodo: (title: string) =>
    request<Todo>('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title }),
    }),

  deleteTodo: (id: number) =>
    request<void>(`/api/todos/${id}`, { method: 'DELETE' }),
}