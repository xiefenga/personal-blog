import FileImport from './FileImport'
import FileExport from './FileExport'
import ClearEditor from './ClearEditor'
import ArticleTitle from './ArticleTitle'
import ArticlePublish from './ArticlePublish'

import './index.css'

function Toolbar() {

  return (
    <div className="editor-toolbar">
      <ArticleTitle />
      <div className="btns">
        <ClearEditor />
        <FileImport />
        <FileExport />
        <ArticlePublish />
      </div>
    </div>
  )
}


export default Toolbar

