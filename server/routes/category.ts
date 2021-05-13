import Router from '@koa/router'
import { createFailResponse, createSuccessResponse } from '../utils/create'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../services/category'

const router = new Router();

router.get('/', async ctx => {
  const [categories, count] = await getCategories();
  ctx.body = createSuccessResponse(categories, count);
});

router.post('/', async ctx => {
  const res = await addCategory(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse(res);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await updateCategory(Number(id), ctx.request.body);
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse();
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const res = await deleteCategory(Number(id));
  ctx.body = Array.isArray(res)
    ? createFailResponse(res)
    : createSuccessResponse();
});

export default router