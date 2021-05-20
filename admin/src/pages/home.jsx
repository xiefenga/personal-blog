import { Layout } from 'antd'
import { useEffect } from 'react'
import Header from '@/layout/Header'
import Welcome from '@/components/Welcome'
import { useAuth } from '@/hooks/admin'
import { Switch, Route } from 'react-router-dom'
import ArticleManage from '@/components/ArticleManage'

const style = { width: '100%', height: '100%' };

function Home() {
  const auth = useAuth();
  useEffect(auth, [auth]);
  return (
    <Layout style={style}>
      <Header />
      <Layout.Content>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/article" component={ArticleManage} />
          <Route path="/category" exact />
          <Route path="/tag" exact />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}


export default Home

