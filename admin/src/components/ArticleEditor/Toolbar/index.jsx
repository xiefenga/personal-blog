import { useCallback } from 'react'
import { useTitle } from '@/hooks/article'
import './index.css'

function Toolbar() {
  const [title, setTitle] = useTitle();
  const onChange = useCallback(
    e => setTitle(e.target.value),
    [setTitle]
  );
  return (
    <div className="editor-toolbar">
      <input
        className="editor-title"
        placeholder="输入文章标题..."
        value={title}
        onChange={onChange}
      />
    </div>
  )
}


export default Toolbar

