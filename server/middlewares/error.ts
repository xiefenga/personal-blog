import { createFailResponse } from '../utils/response'
import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa'

const errorMiddleware = () => (
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next: Next) => {
    try {
      await next();
    } catch (error) {
      ctx.body = createFailResponse(error.message);
    }
  }
);

export default errorMiddleware