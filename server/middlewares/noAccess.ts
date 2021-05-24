import { NOT_LOGIN } from '../utils/tips'
import { createFailResponse } from '../utils/helper'
import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa'

const noAccessMiddleware = () => (
  async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: Next
  ) => {
    try {
      await next();
    } catch (error) {
      if (401 == error.status) {
        ctx.body = createFailResponse(NOT_LOGIN);
      } else {
        throw error;
      }
    }
  }
)

export default noAccessMiddleware