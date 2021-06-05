import Router from '@koa/router'
import { getSiteInfo } from '../services/site'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/', async ctx => ctx.body = createSuccessResponse(
  await getSiteInfo()
));

export default router