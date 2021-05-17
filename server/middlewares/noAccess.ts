import { createFailResponse } from '../utils/response'
import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa'

const noAccessMiddleware = () => (
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next: Next) => {
    try {
      await next();
    } catch (error) {
      if (401 == error.status) {
        ctx.body = createFailResponse(['还未登录，请先登录']);
      } else {
        throw error;
      }
    }
  }
)

export default noAccessMiddleware