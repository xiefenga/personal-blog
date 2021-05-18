import { useEffect } from 'react'
import { whoAmI } from '@/api/login'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setAdminAction } from '@/store/action/admin'


function Home(props) {
  const { admin, updateAdminInfo } = props;
  const history = useHistory();
  useEffect(() => {
    if (admin === null) {
      whoAmI().then(res => {
        if (res.state === 'success') {
          updateAdminInfo(res.data);
        } else {
          history.push('/login');
        }
      });
    }
  }, [admin, updateAdminInfo, history]);
  return (
    <div>
      home
    </div>
  )
}

const mapStateToProps = state => ({
  admin: state.admin
});

const mapDispatchToProps = dispath => ({
  updateAdminInfo: info => dispath(setAdminAction(info))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home)

