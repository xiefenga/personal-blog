import Koa from 'koa'
import path from 'path'
import cors from '@koa/cors'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import 'reflect-metadata'
import './entities/init'
import './test'

const app = new Koa();

app.use(cors());

app.use(koaStatic(path.resolve(__dirname, './public')));

app.use(bodyParser());

app.listen(8080, () => console.log('server is running on 8080'));