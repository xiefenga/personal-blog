import { useSiteInfo } from '@/hooks/store'
import { Descriptions, Image } from 'antd'
import './index.css'

const style = { alignItems: 'center' };

function SiteManage() {
  const { author, mail, github, siteName, beian, defaultCover, aboutMe } = useSiteInfo();
  return (
    <div className="site-manage">
      <div className="site-info">
        <Descriptions title="站点信息" column={1}>
          <Descriptions.Item label="作者">{author}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{mail}</Descriptions.Item>
          <Descriptions.Item label="github">{github}</Descriptions.Item>
          <Descriptions.Item label="站点名">{siteName}</Descriptions.Item>
          <Descriptions.Item label="备案号">{beian}</Descriptions.Item>
          <Descriptions.Item label="默认封面" labelStyle={style}>
            <Image height={60} width={100} src={defaultCover} />
          </Descriptions.Item>
          <Descriptions.Item label="关于我">
            {aboutMe}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}


export default SiteManage

