import { upload2ALiOSS } from './oss'
import { SUCCESS_INTERCEPTOR, ERROR_INTERCEPTOR, EMPTY_FUNC } from './constants'


// 计算 markdown 中的 有效 字数
export const wordsCount = data => {
  const pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g;
  const m = data.match(pattern);
  let count = 0;
  if (m === null) return count;
  for (let i = 0; i < m.length; i++) {
    if (m[i].charCodeAt(0) >= 0x4e00) {
      count += m[i].length;
    } else {
      count += 1;
    }
  }
  return count;
}

// 防抖
export const debounce = (callback, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  }
}

// 将一个 promise 包装成一个可以取消的 promsie
export const cancelablePromise = promise => {
  let isCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      value => (isCanceled ? reject({ isCanceled, value }) : resolve(value)),
      error => reject({ isCanceled, error }),
    );
  });

  return {
    promise: wrappedPromise,
    cancel: () => (isCanceled = true),
  };
}

// 将树形数据结构中的属性名进行改变
export const treeDateTransform = (data, map) => ({
  ...map(data),
  children: data.children
    ? data.children.map(c => treeDateTransform(c, map))
    : []
});

// 从二维的树型结构中寻找 id 相等的坐标
export const findIDIndex = (id, categories) => {
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    if (c.id === id) {
      return [i, -1];
    } else {
      const j = c.children.findIndex(c => c.id === id);
      if (j !== -1) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

export const setInterceptors = (...instances) => {
  instances.forEach(ins => {
    ins.interceptors.response.use(
      SUCCESS_INTERCEPTOR,
      ERROR_INTERCEPTOR
    )
  });
}


export const uploadAdaptor = async ({ file, onSuccess = EMPTY_FUNC, onError = EMPTY_FUNC, onProgress = EMPTY_FUNC }) => {
  const config = JSON.parse(
    window.localStorage.getItem('oss-config')
  );
  const resp = await upload2ALiOSS(config, Date.now(), file);
  onSuccess(resp.url);
}

export const preLoadImg = (src, onSuccess = EMPTY_FUNC, onError = EMPTY_FUNC) => {
  const img = new Image();
  img.onload = onSuccess;
  img.onerror = onError;
  img.src = src;
}

export const delay = n => new Promise(resolve => window.setTimeout(resolve, n));

// 获取当前年份
export const getYear = () => new Date().getFullYear();

export const isEmpty = value => value == null || value === '' || (Array.isArray(value) && !value.length);

export const getUID = () => Date.now().toString();

const colors = [
  '#52a08',
  '#9cb23e',
  '#c3c23d',
  '#6681be',
  '#742f',
  '#467119',
  '#7b8935',
  '#1beeba',
  '#fc6582',
  '#96816e',
  '#d2e40c',
  '#104854',
  '#e77c8f',
  '#a21dc0',
  '#df7002',
  '#7837f3'
];

export const randomColor = id => colors[id % 16];



