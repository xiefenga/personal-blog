import Router from '@koa/router'
import articleRouter from './article'
import categoryRouter from './category'

const router = new Router({ prefix: '/api' });

router.use('/article', articleRouter.routes());

router.use('/category', categoryRouter.routes());

export default router;