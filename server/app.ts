import 'reflect-metadata'
import Koa from 'koa'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import errorHandle from './middlewares/error'
import noAccess from './middlewares/noAccess'
import router from './middlewares/router'
import { JWT_SECRET, JWT_IGNORE_ROUTES, STATIC_PATH } from './utils/constants'
import './init'

const app = new Koa();

app.use(errorHandle());

app.use(cors());

app.use(koaStatic(STATIC_PATH));

app.use(bodyParser());

app.use(noAccess());

app.use(jwt({ secret: JWT_SECRET, cookie: 'token' }).unless(JWT_IGNORE_ROUTES));

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(8080, () => console.log('server is running on 8080'));
