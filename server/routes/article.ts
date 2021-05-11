import Router from '@koa/router'

const router = new Router();

router.get('/', async ctx => {
  let { page, size } = ctx.request.query;
  ctx.body = ctx.url;
});

router.get('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = ctx.url;
});

router.post('/', async ctx => {
  ctx.body = ctx.url;
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