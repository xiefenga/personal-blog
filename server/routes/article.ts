import Router from '@koa/router'
import { addArticle, getArticles } from '../services/article'
import { queryTransformNumber } from '../utils/transform'

const router = new Router();

router.get('/', async ctx => {
  const [page, size] = queryTransformNumber(ctx.request.query, 'page', 'size');
  ctx.body = await getArticles(page, size);
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

router.post('/', async ctx => {
  ctx.body = await addArticle(ctx.request.body);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

export default router