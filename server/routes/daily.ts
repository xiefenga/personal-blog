import Router from '@koa/router'
import { getDailyQuote } from '../services/daily'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/quote', ctx => {
  const quote = getDailyQuote();
  ctx.body = createSuccessResponse(quote);
})

export default router