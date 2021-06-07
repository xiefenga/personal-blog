import Router from '@koa/router'
import { getSiteInfo, updateSiteInfo } from '../services/site'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/', async ctx => ctx.body = createSuccessResponse(
  await getSiteInfo()
));

router.post('/', async ctx => {
  const siteInfo = await updateSiteInfo(ctx.request.body);
  ctx.body = createSuccessResponse(siteInfo);
});

export default router