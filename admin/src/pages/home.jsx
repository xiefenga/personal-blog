import { Layout } from 'antd'
import Header from '@/layout/Header'
import { useAuth } from '@/hooks/http'
import Loading from '@/components/Loading'
import Welcome from '@/components/Welcome'
import TagManage from '@/components/TagManage'
import ArticleManage from '@/components/ArticleManage'
import CategoryManage from '@/components/CategoryManage'
import { useEffect, useState, useCallback } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useGetCategories, useGetTags } from '@/hooks/store'

const style = { width: '100%', height: '100%' };

function Home() {
  const auth = useAuth();
  const getTags = useGetTags();
  const getCategories = useGetCategories();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState('登录中');

  const init = useCallback(
    async () => {
      const success = await auth();
      if (success) {
        setTip('获取类目和标签中');
        await Promise.all([
          getTags(),
          getCategories()
        ]);
        setLoading(false);
      } else {
        history.push('/login');
      }
    },
    [auth, history, getTags, getCategories]
  );
  useEffect(init, [init]);

  return (
    <Layout style={style}>
      <Header />
      <Layout.Content>
        {loading
          ? (
            <Loading tip={tip} size="large" loading={loading} delay={100} />
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

