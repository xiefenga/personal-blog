import { useCallback } from 'react'
import { useTitle } from '@/hooks/store'
import './index.css'

function ArticleTitle() {
  const [title, setTitle] = useTitle();
  const onChange = useCallback(
    e => setTitle(e.target.value),
    [setTitle]
  );
  return (
    <input
      className="editor-title"
      placeholder="输入文章标题..."
      value={title}
      onChange={onChange}
    />
  )
}



export default ArticleTitle

