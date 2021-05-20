import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { usePaths, useToHome } from '@/hooks/routes'
import { useAdmin, useConfirmLogout } from '@/hooks/admin'
import { Layout, Row, Col, Avatar, Menu } from 'antd'

import './Header.css'

function Header() {

  const [admin] = useAdmin();

  const avatar = admin ? admin.avatar : '';

  const username = admin ? admin.username : '';

  const onClick = useToHome();

  const selectedKeys = usePaths()[0];

  const confirmLogout = useConfirmLogout(username);

  return (
    <Layout.Header id="header">
      <Row>
        <Col span={4}>
          <h1 onClick={onClick}>个人博客后台</h1>
        </Col>
        <Col span={12} >
          <Menu className="header-menu" mode="horizontal" selectedKeys={selectedKeys}>
            <Menu.Item key="article">
              <Link to="/article">文章管理</Link>
            </Menu.Item>
            <Menu.Item key="category">
              <Link to="/category" >类目管理</Link>
            </Menu.Item>
            <Menu.Item key="tag">
              <Link to="/tag">标签管理</Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3} offset={5} >
          <div className="admin" onClick={confirmLogout}>
            <Avatar size="middle" icon={<UserOutlined />} src={avatar} />
            <span className="username">{username}</span>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
