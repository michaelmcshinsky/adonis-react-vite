import type { HttpContext } from '@adonisjs/core/http';
import Todo from '#models/todo';

export default class TodosController {
  async index({ response }: HttpContext) {
    const todos = await Todo.query().orderBy('created_at', 'desc');
    return response.json(todos);
  }

  async store({ request, response }: HttpContext) {
    const raw = request.body() as { title?: string };
    const title = String(raw.title ?? '').trim();
    if (title.length < 1 || title.length > 200) {
      return response.status(422).json({
        message: 'Validation failed',
        errors: { title: ['Title must be 1-200 characters'] },
      });
    }
    const todo = await Todo.create({ title, completed: false });
    return response.status(201).json(todo);
  }

  async destroy({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id);
    await (todo as unknown as { delete: () => Promise<void> }).delete();
    return response.status(204).send(null);
  }
}
