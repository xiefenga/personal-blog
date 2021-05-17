interface IResponse {
  state: 'success' | 'fail'
}

interface ISuccessResponse extends IResponse {
  state: 'success';
  data: any;
  count?: number;
}

interface IFailResponse extends IResponse {
  state: 'fail';
  error: string
}


export { ISuccessResponse, IFailResponse }