import Router from '@koa/router'
import { createSuccessResponse } from '../utils/helper'
import { getArticlesByDate, getArticlesDateSummary } from '../services/archives'

const router = new Router();

router.get('/', async ctx => {
  const data = await getArticlesDateSummary();
  ctx.body = createSuccessResponse(data);
});

router.get('/:year/:month', async ctx => {
  const { year, month } = ctx.params;
  const data = await getArticlesByDate(Number(year), Number(month));
  ctx.body = createSuccessResponse(data);
});

export default router