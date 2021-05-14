import { IFailResponse, ISuccessResponse } from '../types/response'

function createSuccessResponse(data: any = null, count?: number): ISuccessResponse {
  const response: ISuccessResponse = { state: 'success', data };
  if (count !== undefined) {
    response.count = count;
  }
  return response;
}

function createFailResponse(errors: string[]): IFailResponse {
  const response: IFailResponse = { state: 'fail', errors };
  return response;
}

export { createSuccessResponse, createFailResponse }