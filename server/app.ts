import 'reflect-metadata'
import Koa from 'koa'
import path from 'path'
import cors from '@koa/cors'
import router from './routes'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import './db/init'

const app = new Koa();

app.use(cors());

app.use(koaStatic(path.resolve(__dirname, './public')));

app.use(bodyParser());

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(8080, () => console.log('server is running on 8080'));