import Router from '@koa/router'
import { getArchives } from '../services/article'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/', async ctx => {
  const archives = await getArchives();
  ctx.body = createSuccessResponse(archives);
});


export default router