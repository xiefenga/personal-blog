import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAdmin } from '@/hooks/store'
import { useLogout } from '@/hooks/routes'
import { UserOutlined } from '@ant-design/icons'
import { usePaths, useGoHome } from '@/hooks/routes'
import { Layout, Row, Col, Avatar, Menu } from 'antd'
import './Header.css'


function Header() {

  const [admin] = useAdmin();

  const [avatar, username] = useMemo(
    () => (admin
      ? [admin.avatar, admin.username]
      : ['', '登录中']
    ),
    [admin]
  );

  const goHome = useGoHome();

  const selectedKeys = usePaths()[0];

  const confirmLogout = useLogout(username);

  return (
    <Layout.Header id="header">
      <Row>
        <Col span={4}>
          <h1 onClick={goHome}>个人博客后台</h1>
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
