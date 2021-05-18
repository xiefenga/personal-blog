import { IFailResponse, ISuccessResponse } from '../types/response'

function createSuccessResponse(data: any = null, count?: number): ISuccessResponse {
  const response: ISuccessResponse = { status: 'success', data };
  if (count !== undefined) {
    response.count = count;
  }
  return response;
}

function createFailResponse(errors: string[] | string): IFailResponse {
  const error = Array.isArray(errors) ? errors[0] : errors;
  const response: IFailResponse = { status: 'fail', error };
  return response;
}

export { createSuccessResponse, createFailResponse }