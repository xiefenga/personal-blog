import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import './index.css'

const { Title, Paragraph } = Typography;

const Welcome = () => (
  <div className="welcome">
    <Typography>
      <Title>个人博客管理系统</Title>
      <Paragraph className="paragraph">
        <ul>
          <li>
            <Link to="/article">文章管理</Link>
            <ul>
              <li>
                <Link to="/article/edit">写文章</Link>
              </li>
              <li>
                <Link to="/article/list">文章列表</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/belong">文章归属</Link>
            <ul>
              <li>
                <Link to="/belong">类目</Link>
              </li>
              <li>
                <Link to="/belong">标签</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/site">站点管理</Link>
          </li>
        </ul>
      </Paragraph>
      <Title level={5} > 欢迎页暂时不知道写啥，就放些链接吧</Title>
    </Typography>
  </div>
)

export default Welcome
