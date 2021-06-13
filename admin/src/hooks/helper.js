import matter from 'gray-matter'
import { message, Modal } from 'antd'
import { useRef, useCallback } from 'react'
import { delay, cancelablePromise } from '@/utils/helper'
import { CLICK_DOUBLECLICK_INTERVAL as INTERVAL } from '@/utils/constants'
import { useMarkdown, useTitle, useCover, useArticleTags, useArticleCategories, useTags, useCategories } from './store'


export const usePreviewImg = (initURL) => {
  return useCallback(
    url => {
      Modal.info({
        icon: null,
        title: <p><b>图片预览</b></p>,
        content: <img src={url ?? initURL} alt="" style={{ width: '100%' }} />,
        okText: '关闭'
      });
    },
    []
  );
}

export const useFileFillStore = () => {
  const [, setMarkdown] = useMarkdown();
  const [, setTitle] = useTitle();
  const [, setCover] = useCover();
  const [, setTags] = useArticleTags();
  const [, setCategories] = useArticleCategories();
  const allTags = useTags();
  const allCategories = useCategories();
  return useCallback(
    file => {
      const { name, content } = file;
      try {
        const {
          data: { title, cover, categories, tags },
          content: md
        } = matter(content);
        setTitle(title ?? name.split('.')[0]);
        setMarkdown(md);
        cover && setCover(cover);
        // 处理 categories
        if (Array.isArray(categories) && categories.length > 0) {
          if (Array.isArray(categories[0]) && categories.length > 0 && categories.length < 3) {
            setCategories(
              categories.map(cs => {
                const p = allCategories.find(c => c.name === cs[0]);
                if (!p) { return null; }
                if (cs.length === 2) {
                  const c = p.children.find(c => c.name === cs[1]);
                  if (!c) { return null }
                  return c.id;
                }
                return p.id;
              }).filter(c => c !== null)
            );
          } else if (typeof categories[0] === 'string') {
            setCategories(
              categories.map(cName => {
                const c = allCategories.find(c => c.name === cName);
                if (!c) { return null; }
                return c.id;
              }).filter(c => c !== null)
            );
          }
        } else if (typeof categories === 'string') {
          const c = allCategories.find(c => c.name === categories);
          c && setCategories([c.id]);
        }
        // 处理 tags
        if (Array.isArray(tags)) {
          setTags(
            tags.map(tName => {
              const t = allTags.find(t => t.name === tName);
              if (!t) { return null; }
              return t.id;
            }).filter(t => t !== null)
          );
        } else if (typeof tags === 'string') {
          const t = allTags.find(t => t.name === tags);
          t && setTags([t.id]);
        }
      } catch (error) {
        setMarkdown(content);
        setTitle(name.split('.')[0]);
        message.error('YMAL 解析失败');
        console.log(error.message);
      }
    },
    [setMarkdown, setTitle, setCover, setCategories, allCategories, setTags, allTags]
  );
}

export const useCancelablePromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromise = promise =>
    pendingPromises.current = [...pendingPromises.current, promise];

  const removePendingPromise = promise =>
    pendingPromises.current = pendingPromises.current.filter(p => p !== promise);

  const clearPendingPromises = () => pendingPromises.current.map(p => p.cancel());

  return {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };
};

export const useCorrectDoubleClick = (onClick, onDoubleClick) => {
  const api = useCancelablePromises();

  const handleClick = (...args) => {
    api.clearPendingPromises();
    const waitForClick = cancelablePromise(delay(INTERVAL));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick && onClick(...args);
      })
      .catch(errorInfo => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (...args) => {
    api.clearPendingPromises();
    onDoubleClick && onDoubleClick(...args);
  };

  return [handleClick, handleDoubleClick];
};


