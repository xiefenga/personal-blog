interface IResponse {
  status: 'success' | 'fail'
}

interface ISuccessResponse extends IResponse {
  status: 'success';
  data: any;
  count?: number;
}

interface IFailResponse extends IResponse {
  status: 'fail';
  error: string
}


export { ISuccessResponse, IFailResponse }