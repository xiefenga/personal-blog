import { message } from 'antd'

export const THROTTLE_MD_RENDER_TIME = 100;

export const EDITOR_OPTIONS = {
  theme: 'md-mirror',
  keyMap: 'sublime',
  mode: 'markdown',
  lineWrapping: true,
  lineNumbers: false,
}

export const CLICK_DOUBLECLICK_INTERVAL = 200;

export const SUCCESS = 'success';

export const FAIL = 'fail';

export const ARTICLE_LIST_PAGE_SIZE = 5;

export const SUCCESS_INTERCEPTOR = resp => {
  const { status, error } = resp.data;
  if (status === FAIL) {
    message.error(error);
  }
  return resp.data;
};

export const ERROR_INTERCEPTOR = error => {
  const resp = { status: FAIL };
  let msg;
  if (error.response) {
    // 服务端的响应导致 axios 错误，
    // 由于状态码 out of the range of 2xx
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