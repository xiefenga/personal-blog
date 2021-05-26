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

const config = {
  "region": "oss-cn-hangzhou",
  "accessKeyId": "LTAI4GCzjyniTeYBwjpdsRXo",
  "accessKeySecret": "uL6LpltM9wNpmJQCRJ4IWQL4Y56ds9",
  "bucket": "xf-blog-imgs",
  "customUrl": "http://oss.xiefeng.tech",
  "path": "blogs-imgs/"
};

export const uploadAdaptor = async ({ file, onSuccess = EMPTY_FUNC, onError = EMPTY_FUNC, onProgress = EMPTY_FUNC }) => {
  const resp = await upload2ALiOSS(config, Date.now(), file);
  // console.log(resp);
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



