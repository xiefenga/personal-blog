import { message } from 'antd'

const correctInterceptor = resp => {
  const { state, error } = resp.data;
  if (state === 'fail') {
    message.error(error);
  }
  return resp.data;
};

const errorInterceptor = error => {
  const resp = { status: 'fail' };
  let msg;
  if (error.response) {
    // 服务端返回的导致 axios 错误，这时是由于状态码 out of the range of 2xx
    // return { status: 'fail', error: error.response.data }
    resp.error = error.response.data;
    msg = '请求失败，请检查接口是否正确';
  } else if (error.request) {
    // 发出请求但是没有收到响应
    resp.error = error.message;
    msg = '请求超时，请重试';
  } else {
    // Something happened in setting up the request that triggered an Error
    resp.error = error.message;
    msg = '出错了，请重试';
  }
  message.error(msg);
  return resp;
};

export { correctInterceptor, errorInterceptor }
