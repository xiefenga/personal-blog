import Router from '@koa/router'
import { createSuccessResponse } from '../utils/helper'
import { getArticlesByTagId } from '../services/article'
import { addTag, deleteTag, getTags, updateTag } from '../services/tag'

const router = new Router();

router.get('/', async ctx => {
  const tagList = await getTags();
  ctx.body = createSuccessResponse(tagList);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const articles = await getArticlesByTagId(Number(id));
  ctx.body = createSuccessResponse(articles);
});

router.post('/', async ctx => {
  const tag = await addTag(ctx.request.body);
  ctx.body = createSuccessResponse(tag);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const tag = await updateTag(Number(id), ctx.request.body);
  ctx.body = createSuccessResponse(tag);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteTag(Number(id));
  ctx.body = createSuccessResponse();
})

export default router