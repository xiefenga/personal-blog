import { Layout } from 'antd'
import { useEffect } from 'react'
import Header from '@/layout/Header'
import Welcome from '@/components/Welcome'
import { useAuth } from '@/hooks/routes'
import { Switch, Route } from 'react-router-dom'
import TagManage from '@/components/TagManage'
import ArticleManage from '@/components/ArticleManage'
import CategoryManage from '@/components/CategoryManage'
import Loading from '@/components/Loading'

const style = { width: '100%', height: '100%' };

function Home() {
  const [loading, auth] = useAuth();
  useEffect(auth, [auth]);

  return (
    <Layout style={style}>
      <Header />
      <Layout.Content>
        {loading
          ? (
            <Loading tip="登录中" size="large" loading={loading} delay={100} />
          ) : (
            <Switch>
              <Route path="/" component={Welcome} exact />
              <Route path="/article" component={ArticleManage} />
              <Route path="/category" component={CategoryManage} exact />
              <Route path="/tag" component={TagManage} exact />
            </Switch>
          )
        }
      </Layout.Content>
    </Layout>
  )
}


export default Home

