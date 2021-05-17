import 'reflect-metadata'
import Koa from 'koa'
import jwt from 'koa-jwt'
import cors from '@koa/cors'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import errorMiddleware from './middlewares/error'
import noAccess from './middlewares/noAccess'
import router from './middlewares/router'
import { jwtSecret, staticPath, jwtIgnore } from './utils/configs'
import './db/init'

const app = new Koa();

app.use(errorMiddleware());

app.use(cors());

app.use(koaStatic(staticPath));

app.use(bodyParser());

app.use(noAccess());

app.use(jwt({ secret: jwtSecret }).unless(jwtIgnore));

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(8080, () => console.log('server is running on 8080'));