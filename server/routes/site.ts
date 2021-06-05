import Router from '@koa/router'
import { getSiteInfo } from '../services/site'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/', ctx => ctx.body = createSuccessResponse(
  getSiteInfo()
));

export default router