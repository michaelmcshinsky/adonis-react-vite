import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiError, api, type Todo } from './lib/api.js'
import { ErrorBoundary } from './components/ErrorBoundary.js'
import './styles.css'

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof ApiError ? err.message : fallback
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [health, setHealth] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTodos = useCallback(async () => {
    try {
      const data = await api.listTodos()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError(errorMessage(err, 'Failed to load todos'))
    }
  }, [])

  useEffect(() => {
    Promise.all([
      api.getHealth().then((d: { status: string }) => setHealth(d.status)),
      loadTodos(),
    ])
      .catch(() => setHealth('unreachable'))
      .finally(() => setLoading(false))
  }, [loadTodos])

  async function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed || submitting) return

    setSubmitting(true)
    try {
      await api.createTodo(trimmed)
      setTitle('')
      await loadTodos()
    } catch (err) {
      setError(errorMessage(err, 'Failed to create todo'))
    } finally {
      setSubmitting(false)
    }
  }

  async function onDelete(id: number) {
    try {
      await api.deleteTodo(id)
      await loadTodos()
    } catch (err) {
      setError(errorMessage(err, 'Failed to delete todo'))
    }
  }

  return (
    <section className="mx-auto max-w-lg py-12">
      <h1 className="text-3xl font-bold">Adonis + React + Vite</h1>
      <p className="mt-2 text-sm text-gray-500">
        API health: {loading ? 'checking...' : health}
      </p>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={onAdd} className="mt-8 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a todo..."
          maxLength={200}
          disabled={submitting}
          className="flex-1 rounded border border-gray-300 px-3 py-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Adding...' : 'Add'}
        </button>
      </form>

      <ul className="mt-6 divide-y divide-gray-100">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between py-3">
            <span>{todo.title}</span>
            <button
              type="button"
              onClick={() => void onDelete(todo.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
        {todos.length === 0 && !loading && (
          <li className="py-3 text-sm text-gray-400">No todos yet.</li>
        )}
      </ul>
    </section>
  )
}

const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
  )
}