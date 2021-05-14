import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa'

const errorMiddleware = () => async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.body = {
      status: 'fail',
      error: error.message
    }
  }
}

export default errorMiddleware