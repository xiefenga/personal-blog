import Router from '@koa/router'
import { addTag, deleteTag, getTags, updateTag } from '../services/tag'
import { createFailResponse, createSuccessResponse } from '../utils/create'

const router = new Router();

router.get('/', async ctx => {
  const [data, count] = await getTags();
  ctx.body = createSuccessResponse(data, count);
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