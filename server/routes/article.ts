import Router from '@koa/router'
import { query2Number } from '../utils/transform'
import { createSuccessResponse } from '../utils/helper'
import { addArticle, deleteArticle, getArticleById, getArticles, updateArticle } from '../services/article'

const router = new Router();

router.get('/', async ctx => {
  const [page, size] = query2Number(
    ctx.request.query,
    'page',
    'size'
  );
  const articleList = await getArticles(page, size);
  ctx.body = createSuccessResponse(articleList);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const article = await getArticleById(Number(id));
  ctx.body = createSuccessResponse(article);
});

router.post('/', async ctx => {
  const article = await addArticle(ctx.request.body)
  ctx.body = createSuccessResponse(article);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const article = await updateArticle(Number(id), ctx.request.body);
  ctx.body = createSuccessResponse(article);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  await deleteArticle(Number(id));
  ctx.body = createSuccessResponse();
});

export default router