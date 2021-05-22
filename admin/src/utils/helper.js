
// 计算 markdown 中的字数
const wordsCalc = data => {
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
const debounce = (callback, delay) => {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => callback.apply(this, args), delay);
  }
}

// 将一个 promise 包装成一个可以取消的 promsie
const cancelablePromise = promise => {
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

const treeDateTransform = (data, map) => ({
  ...map(data),
  children: data.children
    ? data.children.map(c => treeDateTransform(c, map))
    : []
});

const findCategoryIndex = (id, categories) => {
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    if (c.id === id) {
      return [i];
    } else {
      const j = c.children.findIndex(c => c.id === id);
      if (j !== -1) {
        return [i, j];
      }
    }
  }
}

export const delay = n => new Promise(resolve => setTimeout(resolve, n));

// 获取当前年份
export const getYear = () => new Date().getFullYear();

export const isEmpty = value => value == null || value === '';

export { wordsCalc, debounce, cancelablePromise, treeDateTransform, findCategoryIndex }