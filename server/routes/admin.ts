import jwt from 'jsonwebtoken'
import Router from '@koa/router'
import { IAdmin } from '../types/models'
import { login } from '../services/admin'
import { jwtSecret } from '../utils/configs'
import { createFailResponse, createSuccessResponse } from '../utils/response'


const router = new Router();

router.get('/logout', async ctx => {
  const token = ctx.cookies.get('token');
  if (token) {
    ctx.cookies.set('token', null);
  }
  ctx.body = createSuccessResponse(null);
});

router.post('/login', async ctx => {
  const res = await login(ctx.request.body);
  if (Array.isArray(res)) {
    ctx.body = createFailResponse(res);
  } else {
    const token = jwt.sign(res, jwtSecret, { expiresIn: '2 days' });
    ctx.cookies.set('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
    ctx.body = createSuccessResponse(res);
  }
});

router.get('/whoami', async ctx => {
  const token = ctx.cookies.get('token');
  if (token) {
    try {
      const decode = jwt.verify(token, jwtSecret) as IAdmin;
      ctx.body = createSuccessResponse(decode);
    } catch (_) {
      ctx.body = createFailResponse('身份验证失败，请重新登录');
    }
  } else {
    ctx.body = createFailResponse('未登录或身份已过期，请重新登录');
  }
});

export default router