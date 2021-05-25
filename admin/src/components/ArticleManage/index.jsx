import { Menu } from 'antd'
import { useEffect } from 'react'
import { isEmpty } from '@/utils/helper'
import ArticleList from '../ArticleList'
import ArticleEditor from '../ArticleEditor'
import { Switch, Route, Link } from 'react-router-dom'
import { usePaths, useRedirect } from '@/hooks/routes'
import { FileAddOutlined, EditOutlined } from '@ant-design/icons'
import './index.css'


function ArticleManage() {
  const selectedKeys = usePaths()[1] ?? '';
  const redirect = useRedirect('/article/edit');
  useEffect(
    () => isEmpty(selectedKeys) && redirect(),
    [selectedKeys, redirect]
  );
  return (
    <div className="article-manage">
      <Menu
        className="article-menu"
        mode="inline"
        selectedKeys={selectedKeys}
        inlineCollapsed={true}
      >
        <Menu.Item key="edit" icon={<FileAddOutlined />}>
          <Link to="/article/edit">添加文章</Link>
        </Menu.Item>
        <Menu.Item key="list" icon={<EditOutlined />}>
          <Link to="/article/list">修改文章</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/article/edit/:id?" component={ArticleEditor} exact />
        <Route path="/article/list" component={ArticleList} />
      </Switch>
    </div>
  )
}

export default ArticleManage

