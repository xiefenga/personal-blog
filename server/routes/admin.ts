import jwt from 'jsonwebtoken'
import Router from '@koa/router'
import { login } from '../services/admin'
import { validateJWT } from '../utils/validate'
import { JWT_SECRET } from '../utils/constants'
import { createSuccessResponse } from '../utils/helper'


const router = new Router();

router.get('/logout', async ctx => {
  const token = ctx.cookies.get('token');
  token && ctx.cookies.set('token', null);
  ctx.body = createSuccessResponse();
});

router.post('/login', async ctx => {
  const admin = await login(ctx.request.body);
  const token = jwt.sign(admin, JWT_SECRET, { expiresIn: '2 days' });
  ctx.cookies.set('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true });
  ctx.body = createSuccessResponse(admin);
});

router.get('/whoami', async ctx => {
  const token = ctx.cookies.get('token');
  const admin = validateJWT(token);
  ctx.body = createSuccessResponse(admin);
});

export default router