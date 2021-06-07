import { useSiteInfo } from '@/hooks/store'
import { useCallback, useState } from 'react'
import { Descriptions, Image, Button } from 'antd'
import SiteInfoDialog from '../Dialog/SiteInfoDialog'
import './index.css'

function SiteManage() {
  const { author, mail, github, siteName, beian, defaultCover, aboutMe } = useSiteInfo();
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => setVisible(false), []);
  return (
    <div className="site-manage">
      <div className="site-info">
        <Descriptions title="站点信息" column={3}>
          <Descriptions.Item label="作者">{author}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
          <Descriptions.Item label="github">{github}</Descriptions.Item>
          <Descriptions.Item label="站点名">{siteName}</Descriptions.Item>
          <Descriptions.Item label="备案号">{beian}</Descriptions.Item>
          <Descriptions.Item label="默认封面" >
            <Image height={30} width={80} src={defaultCover} />
          </Descriptions.Item>
          <Descriptions.Item label="关于我">
            <div className="about-me">{aboutMe}</div>
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

