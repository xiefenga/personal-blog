import { useAdmin } from '@/hooks/store'
import { useLogout } from '@/hooks/http'
import { useMemo, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { usePaths, useGoHome } from '@/hooks/routes'
import { Layout, Row, Col, Avatar, Menu, message, Modal } from 'antd'
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'
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

  const logout = useLogout();

  const history = useHistory();

  const confirmLogout = useCallback(
    () => Modal.confirm({
      title: '确认退出',
      icon: <QuestionCircleOutlined />,
      content: `确定退出登录账号 ${username}？`,
      onOk: async () => {
        await logout();
        message.success('退出登录');
        history.push('/login');
      }
    }),
    [history, username, logout],
  );

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
            <Menu.Item key="belong">
              <Link to="/belong" >归属管理</Link>
            </Menu.Item>
            <Menu.Item key="site">
              <Link to="/site" >站点管理</Link>
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
