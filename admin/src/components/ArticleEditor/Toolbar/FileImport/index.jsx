import { message } from 'antd'
import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { importFile } from '@/utils/file'
import { useMarkdown, useTitle } from '@/hooks/store'
import { FileMarkdownOutlined } from '@ant-design/icons'
import './index.css'


function FileImport(props) {
  const { showText, extLimits, className } = props;
  const [, setMarkdown] = useMarkdown();
  const [, setTitle] = useTitle();

  const onChange = useCallback(
    async e => {
      const files = e.target.files;
      // 解决 chrome 下，选择完文件之后，第二次未选择文件 也会触发 change 事件的错误
      if (!files.length) { return; }
      const file = files[0];
      try {
        const { name: fileName, content } = await importFile(file, extLimits);
        setTitle(fileName.split('.')[0]);
        setMarkdown(content);
      } catch (error) {
        message.error(error.message);
      }
    },
    [extLimits, setMarkdown, setTitle]
  );

  return (
    <div className={`file-import ${className}`}>
      <label className="import-btn" htmlFor="import-input">
        <FileMarkdownOutlined /> {showText}
      </label>
      <input id="import-input" type="file" onChange={onChange} />
    </div>
  )
}

FileImport.propTypes = {
  showText: PropTypes.string,
  extLimits: PropTypes.array,
  className: PropTypes.string
}

FileImport.defaultProps = {
  className: '',
  showText: '导入文件',
  extLimits: []
}

export default FileImport
