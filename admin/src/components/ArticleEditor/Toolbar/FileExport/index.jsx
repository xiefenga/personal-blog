import PropTypes from 'prop-types'
import { useCallback } from 'react'
import { Button, message } from 'antd'
import { exportFile } from '@/utils/file'
import { DownloadOutlined } from '@ant-design/icons'
import { useMarkdown, useTitle } from '@/hooks/store'


function FileExport(props) {
  const { showText, className, ext } = props;
  const [markdown] = useMarkdown();
  const [title] = useTitle();

  const onClick = useCallback(
    () => {
      if (!markdown) {
        message.error('文章内容为空');
        return;
      }
      try {
        exportFile(markdown, title ? `${title}.${ext}` : `${Date.now()}.${ext}`);
      } catch (error) {
        message.error(error.message);
      }
    },
    [markdown, title, ext]
  )
  return (
    <div className={`file-export ${className}`}>
      <Button type="dashed" onClick={onClick}>
        <DownloadOutlined />
        {showText}
      </Button>
    </div>
  )
}

FileExport.propTypes = {
  ext: PropTypes.string,
  showText: PropTypes.string,
  className: PropTypes.string
}

FileExport.defaultProps = {
  ext: 'md',
  showText: '导出文件',
  className: '',
}


export default FileExport
