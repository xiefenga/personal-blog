import { Menu } from 'antd'
import { usePaths } from '@/hooks/routes'
import ArticleEditor from '../ArticleEditor'
import { Switch, Route, Link } from 'react-router-dom'
import { FileAddOutlined, EditOutlined } from '@ant-design/icons'
import './index.css'


function ArticleManage() {
  const selectedKeys = usePaths()[1];
  return (
    <div className="article-manage">
      <Menu
        className="article-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        inlineCollapsed={true}
      >
        <Menu.Item key="add" icon={<FileAddOutlined />}>
          <Link to="/article/add">添加文章</Link>
        </Menu.Item>
        <Menu.Item key="update" icon={<EditOutlined />}>
          <Link to="/article/update">修改文章</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/article/add" component={ArticleEditor} exact />
        <Route path="/article/update" />
      </Switch>
    </div>
  )
}

export default ArticleManage

