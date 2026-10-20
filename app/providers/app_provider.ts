import type { ApplicationService } from '@adonisjs/core/types';

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  register(): void {
    // IoC container bindings
  }

  async boot(): Promise<void> {
    // runs after all providers boot
  }

  async start(): Promise<void> {
    // runs after http server starts
  }

  async shutdown(): Promise<void> {
    // cleanup on shutdown
  }
}
