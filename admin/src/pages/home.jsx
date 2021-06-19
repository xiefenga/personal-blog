import { Layout } from 'antd'
import Header from '@/layout/Header'
import Loading from '@/components/Loading'
import Welcome from '@/components/Welcome'
import { useGetOSSCongig } from '@/hooks/http'
import SiteManage from '@/components/SiteManage'
import BelongManage from '@/components/BelongManage'
import ArticleManage from '@/components/ArticleManage'
import { useEffect, useState, useCallback } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useGetCategories, useGetSiteInfo, useGetTags, useAuth } from '@/hooks/store'

const style = { width: '100%', height: '100%' };

function Home() {
  const auth = useAuth();
  const getTags = useGetTags();
  const getCategories = useGetCategories();
  const getOSSCongig = useGetOSSCongig();
  const getSiteInfo = useGetSiteInfo();
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
          getCategories(),
          getOSSCongig(),
          getSiteInfo()
        ]);
        setLoading(false);
      } else {
        history.push('/login');
      }
    },
    [auth, history, getTags, getCategories, getOSSCongig, getSiteInfo]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), []);

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
              <Route path="/belong" component={BelongManage} />
              <Route path="/site" component={SiteManage} />
            </Switch>
          )
        }
      </Layout.Content>
    </Layout>
  )
}


export default Home

