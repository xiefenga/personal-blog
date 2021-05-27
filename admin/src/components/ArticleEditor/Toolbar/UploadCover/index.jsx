import { Popover, Button } from 'antd'
import { useMemo, useCallback, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'
import { FileImageOutlined } from '@ant-design/icons'
import { useCover } from '@/hooks/store'
import { preLoadImg } from '@/utils/helper'


function UploadCover() {
  const [visible, setVisible] = useState();
  const [cover, setCover] = useCover();
  const urls = useMemo(() => cover ? [cover] : [], [cover]);
  const onSuccess = useCallback(
    ({ resp }) => {
      preLoadImg(resp);
      setCover(resp);
    },
    [setCover]
  );
  const onRemove = useCallback(() => setCover(null), [setCover]);
  return (
    <div className="cover-upload">
      <Popover
        placement="bottom"
        destroyTooltipOnHide={true}
        trigger="click"
        title="上传文章封面"
        content={
          <div style={{ width: '300px' }}>
            <ImageUpload
              limit={1}
              urls={urls}
              onSuccess={onSuccess}
              onRemove={onRemove}
            />
          </div>
        }
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button type="dashed">
          <FileImageOutlined />
          上传封面
        </Button>
      </Popover>
    </div>
  )
}

export default UploadCover

