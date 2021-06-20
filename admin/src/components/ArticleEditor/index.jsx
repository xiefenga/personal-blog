import { Spin } from 'antd'
import Toolbar from './Toolbar'
import { useGetArticle } from '@/hooks/store'
import MarkdownEditor from './MarkdownEditor'
import { LoadingOutlined } from '@ant-design/icons'
import { useEffect, useCallback, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import './index.css'


function ArticleEditor() {
  const { id } = useParams();
  const getArticle = useGetArticle();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const init = useCallback(
    async () => {
      if (id) {
        setLoading(true);
        const success = await getArticle(id);
        setLoading(false);
        if (!success) {
          history.replace('/404');
        }
      }
    },
    [id, getArticle, history]
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

