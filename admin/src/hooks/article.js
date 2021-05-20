import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setArticleAction } from '@/store/action/article'
import { markdownParser } from '@/utils/markdown'

function useMarkdown() {
  const { markdown = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateMarkdown = useCallback(
    value => dispatch(setArticleAction({ markdown: value })),
    [dispatch]
  );
  return [markdown, updateMarkdown];
}


function useHTML(markdown) {
  return useMemo(
    () => markdownParser.render(markdown),
    [markdown]
  );
}


function useTitle() {
  const { title = '' } = useSelector(state => state.article);
  const dispatch = useDispatch();
  const updateTitle = useCallback(
    value => dispatch(setArticleAction({ title: value })),
    [dispatch]
  );
  return [title, updateTitle];
}

export { useMarkdown, useHTML, useTitle }