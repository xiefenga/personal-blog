import { postArticle, updateArticle } from '@/api/article'
import { isEmpty } from '@/utils/helper'
import { message } from 'antd'
import { useCallback } from 'react'
import { useArticle, useClearArticle } from './store'
import { SUCCESS_STATUS as SUCCESS } from '@/utils/constants'
import { useParams } from 'react-router'

function usePostArtilce() {
  const article = useArticle();
  const clear = useClearArticle();
  const { id } = useParams();
  return useCallback(
    async () => {
      const {
        title = '',
        content = '',
        categories = [],
        tags = []
      } = article;

      if (isEmpty(title)) {
        message.error('文章标题为空');
      } else if (isEmpty(content)) {
        message.error('文章内容为空');
      } else if (isEmpty(categories)) {
        message.error('文章类目为空');
      } else if (isEmpty(tags)) {
        message.error('文章标签为空');
      } else {
        const { status } = id
          ? await updateArticle(id, article)
          : await postArticle(article);
        if (status === SUCCESS) {
          message.success('发布成功');
          clear();
        }
        return status === SUCCESS;
      }
      return false;
    },
    [article, clear, id]
  );
}

export { usePostArtilce }