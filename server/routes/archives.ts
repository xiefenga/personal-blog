import Router from '@koa/router'
import { getArchives } from '../services/article'
import { queryTransformNumber } from '../utils/transform'
import { createFailResponse, createSuccessResponse } from '../utils/response';


const router = new Router();

router.get('/archives', async ctx => {
  const [page, size] = queryTransformNumber(ctx.request.query, 'page', 'size');
  const res = await getArchives(page, size);
  ctx.body = Array.isArray(res)
    ? createSuccessResponse(res[0], res[1])
    : createFailResponse([res]);
});

export default router