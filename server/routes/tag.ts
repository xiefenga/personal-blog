import Router from '@koa/router'
import { getArticlesByTagId } from '../services/article'
import { addTag, deleteTag, getTags, updateTag } from '../services/tag'
import { createFailResponse, createSuccessResponse } from '../utils/response'

const router = new Router();

router.get('/', async ctx => {
  const [data, count] = await getTags();
  ctx.body = createSuccessResponse(data, count);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await getArticlesByTagId(Number(id));
  ctx.body = Array.isArray(res)
    ? createSuccessResponse(res[0], res[1])
    : createFailResponse(res);
});

router.post('/', async ctx => {
  const res = await addTag(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse(res);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateTag(Number(id), ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse(res);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await deleteTag(Number(id));
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse();
})

export default router