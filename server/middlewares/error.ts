import { createFailResponse } from '../utils/helper'
import { ParameterizedContext, DefaultState, DefaultContext, Next } from 'koa'

const errorMiddleware = () => (
  async (
    ctx: ParameterizedContext<DefaultState, DefaultContext>,
    next: Next
  ) => {
    try {
      await next();
    } catch (error) {
      ctx.body = createFailResponse(
        error instanceof Error
          ? error.message
          : error
      );
    }
  }
);

export default errorMiddleware