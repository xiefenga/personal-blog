import { useAdmin, useLogout } from '@/hooks/store'
import { Link, useHistory } from 'react-router-dom'
import { usePaths, useGoHome } from '@/hooks/routes'
import { useMemo, useCallback, useState } from 'react'
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Layout, Row, Col, Avatar, Menu, message, Popconfirm } from 'antd'
import './Header.css'

function Header() {

  const admin = useAdmin();

  const [avatar, username] = useMemo(
    () => (admin
      ? [admin.avatar, admin.username]
      : ['', '登录中']
    ),
    [admin]
  );

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);

  const goHome = useGoHome();

  const selectedKeys = usePaths()[0];

  const logout = useLogout();

  const history = useHistory();

  // 先触发 visibleChange 事件，再触发 confirm 事件
  const confirmLogout = useCallback(
    async () => {
      // visibleChange 会让 visible 为 false 需要重新设置为 true
      setVisible(true);
      setLoading(true);
      await logout();
      setVisible(false);
      setLoading(false);
      message.success('退出登录');
      history.push('/login');
    },
    [history, logout],
  );

  const buttonProp = useMemo(() => ({ loading }), [loading]);

  // 正在 loading 时不允许隐藏
  const onVisibleChange = useCallback(v => !loading && setVisible(v), [loading])

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
          <Popconfirm
            title="退出登录？"
            visible={visible}
            icon={<QuestionCircleOutlined />}
            okButtonProps={buttonProp}
            onConfirm={confirmLogout}
            onVisibleChange={onVisibleChange}
          >
            <div className="admin">
              <Avatar size="middle" icon={<UserOutlined />} src={avatar} />
              <span className="username">{username}</span>
            </div>
          </Popconfirm>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
