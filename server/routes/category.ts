import Router from '@koa/router'
import { createSuccessResponse } from '../utils/helper'
import { getArticlesByCategoryId } from '../services/article'
import { addCategory, deleteCategory, getCategories, updateCategory } from '../services/category'


const router = new Router();

router.get('/', async ctx => {
  const categoryList = await getCategories();
  ctx.body = createSuccessResponse(categoryList);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const articles = await getArticlesByCategoryId(Number(id));
  ctx.body = createSuccessResponse(articles);
});

router.post('/', async ctx => {
  const category = await addCategory(ctx.request.body);
  ctx.body = createSuccessResponse(category);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const category = await updateCategory(Number(id), ctx.request.body);
  ctx.body = createSuccessResponse(category);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteCategory(Number(id));
  ctx.body = createSuccessResponse();
});

export default router