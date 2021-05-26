import { Upload } from 'antd'
import PropTypes from 'prop-types'
import { uploadAdaptor } from '@/utils/helper'
import { UploadOutlined } from '@ant-design/icons'
import { useCallback, useMemo, useState } from 'react'


function ImageUpload(props) {
  const { showText, urls, limit, onSuccess, onRemove } = props;
  const initFileList = useMemo(
    () => urls.map(url => ({ status: 'done', url })),
    [urls]
  );

  const [fileList, setFileList] = useState(initFileList);

  const customRequest = useCallback(
    async info => {
      const { file, onProgress, onSuccess, onError } = info;
      // onProgress: (event: { percent: number }): void
      // onError: (event: Error, body?: Object): void
      // onSuccess: (body?: Object): void
      // 上传完之后需要调用 onSuccess / onError 用于更改 file 的 status
      uploadAdaptor({ file, onSuccess, onError, onProgress });
    },
    []
  );

  const onChange = useCallback(
    ({ file, fileList }) => {
      console.log(file)
      setFileList(fileList);
      if (file.status === 'done') {
        onSuccess({
          resp: file.response,
          respList: fileList.map(file => file.response)
        });
      } else if (file.status === "removed") {
        onRemove(file.response);
      }
    },
    [onSuccess, onRemove]
  );
  return (
    <Upload
      accept="image/*"
      maxCount={limit}
      listType="picture-card"
      fileList={fileList}
      customRequest={customRequest}
      onChange={onChange}
    >
      <p className="ant-upload-drag-icon">
        <UploadOutlined />
      </p>
      <p className="ant-upload-text">{showText}</p>
    </Upload>
  )
}

ImageUpload.propTypes = {
  showText: PropTypes.string,
  urls: PropTypes.arrayOf(PropTypes.string),
  onSuccess: PropTypes.func,
  onRemove: PropTypes.func
}

ImageUpload.defaultProps = {
  showText: '上传图片',
  urls: [],
  onSuccess: () => { },
  onRemove: () => { }
}

export default ImageUpload

