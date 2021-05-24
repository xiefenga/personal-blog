import Router from '@koa/router'
import { getArchives } from '../services/article'
import { query2Number } from '../utils/transform'
import { createSuccessResponse } from '../utils/helper'

const router = new Router();

router.get('/archives', async ctx => {
  const [page, size] = query2Number(
    ctx.request.query,
    'page',
    'size'
  );
  const archives = await getArchives(page, size);
  ctx.body = createSuccessResponse(archives);
});


export default router