import { useSiteInfo } from '@/hooks/store'
import { usePreviewImg } from '@/hooks/helper'
import { markdownParser } from '@/utils/markdown'
import { Descriptions, Image, Button } from 'antd'
import SiteInfoDialog from '../Dialog/SiteInfoDialog'
import { useCallback, useState, useMemo } from 'react'
import './index.css'

const imgConfig = {
  preview: {
    visible: false
  },
  height: 30,
  width: 80
}


function SiteManage() {
  const { author, mail, github, siteName, beian, defaultCover, aboutMe, avatar } = useSiteInfo();
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => setVisible(false), []);
  const about = useMemo(() => markdownParser.render(aboutMe.replaceAll('\n', '\n\n')), [aboutMe]);
  const preview = usePreviewImg();
  const previewAvatar = useCallback(() => preview(avatar), [avatar, preview]);
  const previewCover = useCallback(() => preview(defaultCover), [preview, defaultCover]);

  return (
    <div className="site-manage">
      <div className="site-info">
        <Descriptions title="站点信息" column={4}>
          <Descriptions.Item label="作者">{author}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
          <Descriptions.Item label="github">{github}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Image {...imgConfig} onClick={previewAvatar} src={avatar} />
          </Descriptions.Item>
          <Descriptions.Item label="站点名">{siteName}</Descriptions.Item>
          <Descriptions.Item label="备案号">{beian}</Descriptions.Item>
          <Descriptions.Item label="默认封面" span={2} >
            <Image {...imgConfig} onClick={previewCover} src={defaultCover} />
          </Descriptions.Item>
          <Descriptions.Item label="关于我" >
            <div className="about-me" title={aboutMe} dangerouslySetInnerHTML={{ __html: about }} />
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className="edit-site">
        <Button type="primary" onClick={() => setVisible(true)}>修改信息</Button>
      </div>
      <SiteInfoDialog visible={visible} onClose={onClose} />
    </div>
  )
}


export default SiteManage

