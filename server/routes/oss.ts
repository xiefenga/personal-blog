import Router from '@koa/router'
import { getConfig } from '../services/oss'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/', ctx => {
  const config = getConfig();
  ctx.body = createSuccessResponse(config);
});


export default router