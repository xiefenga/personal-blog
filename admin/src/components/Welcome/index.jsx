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
                <Link to="/article/add">添加文章</Link>
              </li>
              <li>
                <Link to="/article/update">修改文章</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/category">类目管理</Link>
          </li>
          <li>
            <Link to="/tag">标签管理</Link>
          </li>
        </ul>
      </Paragraph>
    </Typography>


  </div>
)

export default Welcome
