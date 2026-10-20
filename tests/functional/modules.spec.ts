import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

describe('project structure', () => {
  it('adonisrc declares providers and preloads', () => {
    const rc = readFileSync(new URL('../../adonisrc.ts', import.meta.url), 'utf-8');
    expect(rc).toContain('@adonisjs/core');
    expect(rc).toContain('start/routes.js');
  });

  it('routes file references health and todos controllers', () => {
    const routes = readFileSync(new URL('../../start/routes.ts', import.meta.url), 'utf-8');
    expect(routes).toContain('/api/health');
    expect(routes).toContain('/api/todos');
  });

  it('React app exports an App component', () => {
    const entry = readFileSync(new URL('../../resources/js/app.tsx', import.meta.url), 'utf-8');
    expect(entry).toContain('export function App');
    expect(entry).toContain('Adonis + React + Vite');
  });
});
