import { getArticle } from '@/api/article'
import { SUCCESS } from '@/utils/constants'
import { useState, useCallback, useRef } from "react"

// interface Article {
//   title: string;
//   cover: string;
//   content: string;
//   tags: number[];
//   categories: number[];
// }

export const STATE_NAME = 'article';


export const useArticle = () => {
  const [article, setArticle] = useState({});
  const articleRef = useRef(article);

  const update = useCallback(
    info => {
      const { current } = articleRef;
      articleRef.current = Object.assign({}, current, info);
      setArticle(articleRef.current);
    },
    []
  );

  const clear = useCallback(() => setArticle({}), []);

  const get = useCallback(
    async id => {
      const { status,
        data = {}
      } = await getArticle(id);
      if (status === SUCCESS) {
        const { cover, content, title, categories, tags } = data;
        const article = { cover, content, title };
        article.categories = categories.map(([p, c]) => (c ?? p).id);
        article.tags = tags.map(t => t.id);
        setArticle(article);
      }
      return status === SUCCESS;
    },
    []
  );

  const setTitle = useCallback(title => update({ title }), [update]);

  const setCover = useCallback(cover => update({ cover }), [update]);

  const setContent = useCallback(content => update({ content }), [update]);

  const setTags = useCallback(tags => update({ tags }), [update]);

  const setCategories = useCallback(categories => update({ categories }), [update]);

  const state = {
    article,
    setTitle,
    setCover,
    setContent,
    setTags,
    setCategories,
    getArticle: get,
    clearArticle: clear,
  };

  return [STATE_NAME, state];
}