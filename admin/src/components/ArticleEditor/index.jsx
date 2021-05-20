import Toolbar from './Toolbar'
import MarkdownEditor from './MarkdownEditor'
import './index.css'

function ArticleEditor() {
  return (
    <div className="article-editor">
      <Toolbar />
      <MarkdownEditor />
    </div>
  )
}


export default ArticleEditor

