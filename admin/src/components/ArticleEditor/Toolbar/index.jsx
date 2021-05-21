import FileImport from './FileImport'
import FileExport from './FileExport'
import ClearButton from './ClearButton'
import ArticleTitle from './ArticleTitle'

import './index.css'

function Toolbar() {

  return (
    <div className="editor-toolbar">
      <ArticleTitle />
      <div className="btns">
        <ClearButton />
        <FileImport />
        <FileExport />
      </div>
    </div>
  )
}


export default Toolbar

