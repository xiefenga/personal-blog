import Router from '@koa/router'
import tagRouter from '../routes/tag'
import articleRouter from '../routes/article'
import categoryRouter from '../routes/category'
import archivesRouter from '../routes/archives'

const router = new Router({ prefix: '/api' });

router.use('/article', articleRouter.routes());

router.use('/category', categoryRouter.routes());

router.use('/archives', archivesRouter.routes());

router.use('/tag', tagRouter.routes());

export default router