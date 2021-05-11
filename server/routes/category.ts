import Router from '@koa/router'
import { addCategory, getCategories } from '../services/category'

const router = new Router();

router.get('/', async ctx => {
  ctx.body = await getCategories();
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  const { page, size } = ctx.request.query;
  ctx.body = ctx.url;
});

router.get('/:pid/:id', async ctx => {
  const { pid, id } = ctx.params;
  const { page, size } = ctx.request.query;
  ctx.body = ctx.url;
});

router.post('/', async ctx => {
  const res = await addCategory(ctx.request.body);
  ctx.body = res;
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

export default router;