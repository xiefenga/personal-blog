import Router from '@koa/router'
import ossRouter from '../routes/oss'
import tagRouter from '../routes/tag'
import siteRouter from '../routes/site'
import dailyRouter from '../routes/daily'
import adminRouter from '../routes/admin'
import articleRouter from '../routes/article'
import categoryRouter from '../routes/category'
import archivesRouter from '../routes/archives'

const router = new Router({ prefix: '/api' });

router.use('/oss', ossRouter.routes());

router.use('/tag', tagRouter.routes());

router.use('/site', siteRouter.routes());

router.use('/daily', dailyRouter.routes());

router.use('/admin', adminRouter.routes());

router.use('/article', articleRouter.routes());

router.use('/category', categoryRouter.routes());

router.use('/archives', archivesRouter.routes());


export default router