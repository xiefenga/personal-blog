import Toolbar from './Toolbar'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetArticle } from '@/hooks/http'
import MarkdownEditor from './MarkdownEditor'
import './index.css'


function ArticleEditor() {
  const { id } = useParams();
  const getArticle = useGetArticle();

  useEffect(
    () => id && getArticle(id),
    [id, getArticle]
  );

  return (
    <div className="article-editor">
      <Toolbar />
      <MarkdownEditor />
    </div>
  )
}


export default ArticleEditor

