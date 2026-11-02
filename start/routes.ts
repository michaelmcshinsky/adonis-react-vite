import router from '@adonisjs/core/services/router'
import type { HttpContext } from '@adonisjs/core/http'
const HealthController = () => import('#controllers/health_controller')
const TodosController = () => import('#controllers/todos_controller')

/**
 * `view` is attached to HttpContext by @adonisjs/view's provider at runtime,
 * but its `render` method isn't surfaced on the type in this version.
 * Cast at this single boundary.
 */
type HttpContextWithView = HttpContext & {
  view: { render: (template: string) => Promise<string> }
}

router.get('/', async (ctx) =>
  (ctx as unknown as HttpContextWithView).view.render('app'),
)

router.get('/api/health', [HealthController, 'show'])
router.get('/api/todos', [TodosController, 'index'])
router.post('/api/todos', [TodosController, 'store'])
router.delete('/api/todos/:id', [TodosController, 'destroy'])