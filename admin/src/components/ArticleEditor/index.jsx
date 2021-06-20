import { Spin } from 'antd'
import Toolbar from './Toolbar'
import { useParams } from 'react-router-dom'
import { useGetArticle } from '@/hooks/store'
import MarkdownEditor from './MarkdownEditor'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useCallback, useState } from 'react'
import './index.css'



function ArticleEditor() {
  const { id } = useParams();
  const getArticle = useGetArticle();

  const [loading, setLoading] = useState(false);

  const init = useCallback(
    async () => {
      if (id) {
        setLoading(true);
        await getArticle(id);
        setLoading(false);
      }
    },
    [id, getArticle]
  )

  useEffect(init, [init]);

  return (
    <div className="article-editor">
      <Spin
        wrapperClassName="editor-container"
        size="large"
        delay={100}
        tip="获取文章内容"
        spinning={loading}
        indicator={<LoadingOutlined spin />}
      >
        <Toolbar />
        <MarkdownEditor />
      </Spin>
    </div>
  )
}


export default ArticleEditor

