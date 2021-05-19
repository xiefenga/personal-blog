import { Layout } from 'antd'
import { useEffect } from 'react'
import { whoAmI } from '@/api/login'
import { connect } from 'react-redux'
import Header from '@/layout/Header'
import { useHistory } from 'react-router-dom'
import { setAdminAction } from '@/store/action/admin'

function Home(props) {
  const { admin, updateAdminInfo } = props;
  const history = useHistory();
  useEffect(() => {
    if (admin === null) {
      whoAmI().then(res => {
        if (res.status === 'success') {
          updateAdminInfo(res.data);
        } else {
          history.push('/login');
        }
      });
    }
  }, [admin, updateAdminInfo, history]);
  return (
    <Layout>
      <Header />
      {/* <Content />
    <Footer /> */}
    </Layout>
  )
}

const mapStateToProps = state => ({
  admin: state.admin
});

const mapDispatchToProps = dispath => ({
  updateAdminInfo: info => dispath(setAdminAction(info))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home)

