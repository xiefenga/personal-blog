import Router from '@koa/router'
import { queryTransformNumber } from '../utils/transform'
import { createFailResponse, createSuccessResponse } from '../utils/response'
import { addArticle, deleteArticle, getArticleById, getArticles, updateArticle } from '../services/article'

const router = new Router();

router.get('/', async ctx => {
  const [page, size] = queryTransformNumber(ctx.request.query, 'page', 'size');
  const res = await getArticles(page, size);
  ctx.body = Array.isArray(res)
    ? createSuccessResponse(res[0], res[1])
    : createFailResponse([res]);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await getArticleById(Number(id));
  ctx.body = typeof res === 'string'
    ? createFailResponse([res])
    : createSuccessResponse(res);
});

router.post('/', async ctx => {
  const res = await addArticle(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse(res);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateArticle(Number(id), ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse(res);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteArticle(Number(id));
  ctx.body = createSuccessResponse();
});

export default router