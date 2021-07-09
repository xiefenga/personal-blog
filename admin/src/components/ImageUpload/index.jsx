import PropTypes from 'prop-types'
import { uploadAdaptor } from '@/utils/helper'
import { usePreviewImg } from '@/hooks/helper'
import { UploadOutlined } from '@ant-design/icons'
import { Upload, Button, Form, Input, Row, Col } from 'antd'
import { useCallback, useMemo, useState, Fragment } from 'react'

const style = { padding: 0 };

const rules = [
  { required: true, message: 'URL不能为空' },
  { type: 'url', message: 'URL格式不正确' }
]


function ImageUpload(props) {
  const { showText, urls, limit, onSuccess, onRemove } = props;
  const initFileList = useMemo(
    () => urls.map(url => ({ status: 'done', url })),
    [urls]
  );

  const [fileList, setFileList] = useState(initFileList);

  const [addFileURL, setAddFileURL] = useState(false);

  const previewImg = usePreviewImg();

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

  const onPreview = useCallback(
    file => previewImg(file.url || file.thumbUrl),
    [previewImg]
  );

  const onFinish = useCallback(
    ({ url }) => {
      setAddFileURL(false);
      const list = fileList.length === limit
        ? fileList.slice(1)
        : fileList;
      setFileList([...list, { status: 'done', url }]);
      onSuccess({
        resp: url,
        respList: [...list.map(file => (file.response || file.url || file.thumbUrl)), url]
      });
    },
    [fileList, limit, onSuccess]
  );

  const showAdd = useCallback(() => setAddFileURL(true), []);

  const cancelAdd = useCallback(() => setAddFileURL(false), []);

  return (
    <div className="img-upload">
      {addFileURL
        ? (
          <Fragment>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item name="url" label="URL" rules={rules}>
                <Input placeholder="请输入图片URL或base64编码" allowClear />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Col>
                    <Button type="link" onClick={cancelAdd}> 取消添加</Button>
                  </Col>
                  <Col>
                    <Button type="link" htmlType="submit"> 确认添加</Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Fragment>
        ) : (
          <Fragment>
            <Upload
              accept="image/*"
              maxCount={limit}
              listType="picture-card"
              fileList={fileList}
              customRequest={customRequest}
              onChange={onChange}
              onPreview={onPreview}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">{showText}</p>
            </Upload>
            <Button type="link" style={style} onClick={showAdd}>添加已上传图片</Button>
          </Fragment>
        )
      }
    </div>
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

