import { logout } from '@/api/login'
import { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Row, Col, Avatar, Menu, Modal, message } from 'antd'
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import './Header.css'

function Header() {

  const history = useHistory();

  const location = useLocation();

  const onClick = useCallback(
    () => history.push('/'),
    [history]
  );

  const selectedKeys = useMemo(
    () => [location.pathname.split('/')[1]],
    [location]
  );

  const confirmLogout = useCallback(
    () => Modal.confirm({
      title: '确认退出',
      icon: <QuestionCircleOutlined />,
      content: '确定退出登录？',
      onOk: async () => {
        await logout();
        message.success('退出登录');
        history.push('/login');
      }
    }),
    [history]
  );

  return (
    <Layout.Header id="header">
      <Row>
        <Col span={4}>
          <h1 onClick={onClick}>个人博客后台</h1>
        </Col>
        <Col span={8} >
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
        <Col span={3} offset={9} >
          <div className="user" onClick={confirmLogout}>
            <Avatar className="avatar" size="middle" icon={<UserOutlined />} />
            <span className="user-name">admin</span>
          </div>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
