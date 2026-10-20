import BaseSeeder from '@adonisjs/lucid/seeders/main';

export default class extends BaseSeeder {
  async run() {
    const { default: Todo } = await import('#models/todo');
    await Todo.createMany([
      { title: 'Read the Adonis 6 docs', completed: false },
      { title: 'Try @adonisjs/vite HMR', completed: false },
    ]);
  }
}
