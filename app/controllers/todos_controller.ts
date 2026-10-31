import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import { createTodoValidator } from '#validators/todo_validator'

export default class TodosController {
  /**
   * List all todos ordered by most recent first.
   */
  async index({ response }: HttpContext) {
    const todos = await Todo.query().orderBy('created_at', 'desc')
    return response.json(todos)
  }

  /**
   * Create a new todo after validating the request body with VineJS.
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createTodoValidator)
    const todo = await Todo.create({ title: data.title, completed: false })
    return response.status(201).json(todo)
  }

  /**
   * Delete a todo by ID.
   */
  async destroy({ params, response }: HttpContext) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
    return response.status(204).send(null)
  }
}