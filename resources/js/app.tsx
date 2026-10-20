import { FormEvent, useCallback, useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [health, setHealth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadTodos = useCallback(async () => {
    const res = await fetch('/api/todos');
    const data = (await res.json()) as Todo[];
    setTodos(data);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch('/api/health')
        .then((r) => r.json())
        .then((d: unknown) => {
          const s = (d as { status?: string }).status;
          setHealth(s ?? 'unknown');
        }),
      loadTodos(),
    ])
      .catch(() => setHealth('unreachable'))
      .finally(() => setLoading(false));
  }, [loadTodos]);

  async function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() }),
    });
    setTitle('');
    await loadTodos();
  }

  async function onDelete(id: number) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    await loadTodos();
  }

  return (
    <section className="mx-auto max-w-lg py-12">
      <h1 className="text-3xl font-bold">Adonis + React + Vite</h1>
      <p className="mt-2 text-sm text-gray-500">
        API health: {loading ? 'checking…' : health}
      </p>

      <form onSubmit={onAdd} className="mt-8 flex gap-2">
        <input
          value={title}
          onChange={(e) => {
            const el = e.target as HTMLInputElement;
            setTitle(el.value);
          }}
          placeholder="Add a todo…"
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add
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
  );
}
