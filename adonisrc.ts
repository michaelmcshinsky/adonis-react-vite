export default {
  compileData: true,
  commands: {
    ace: 'build/adonisrc/commands.js',
  },
  providers: [
    () => import('@adonisjs/core'),
    () => import('@adonisjs/lucid/database_provider'),
    () => import('@adonisjs/static/static_provider'),
    () => import('@adonisjs/view/views_provider'),
    () => import('@adonisjs/vite/vite_provider'),
    () => import('./app/providers/app_provider.js'),
  ],
  preloads: [() => import('./start/routes.js'), () => import('./start/kernel.js')],
  tests: {
    suites: [
      {
        name: 'unit',
        files: ['tests/unit/**/*.spec.ts'],
      },
      {
        name: 'functional',
        files: ['tests/functional/**/*.spec.ts'],
      },
    ],
  },
};
