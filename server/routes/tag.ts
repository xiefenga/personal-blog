import Router from '@koa/router'
import { addTag } from '../services/tag'

const router = new Router();

router.get('/', async ctx => {

});

router.post('/', async ctx => {
  const res = await addTag(ctx.request.body);
  ctx.body = Array.isArray(res)
    ? { status: 'fail', error: res }
    : { status: 'success', data: res };
});

export default router