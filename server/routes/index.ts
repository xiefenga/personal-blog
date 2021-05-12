import Router from '@koa/router'
import tagRouter from './tag'
import articleRouter from './article'
import categoryRouter from './category'

const router = new Router({ prefix: '/api' });

router.use('/article', articleRouter.routes());

router.use('/category', categoryRouter.routes());

router.use('/tag', tagRouter.routes());

export default router;