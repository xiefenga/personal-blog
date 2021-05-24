interface UnknowObject extends Object {
  [s: string]: unknown
}

export { UnknowObject }

interface ISuccessResponse {
  status: 'success';
  data: any;
  count?: number;
}

interface IFailResponse {
  status: 'fail';
  error: string
}

export { ISuccessResponse, IFailResponse }

