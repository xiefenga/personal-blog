import { useCallback } from 'react'
import { message, Modal } from 'antd'
import { whoAmI, logout } from '@/api/login'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { setAdminAction, loginAction } from '@/store/action/admin'


function useAdmin() {
  const admin = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const updateAdmin = useCallback(
    info => dispatch(setAdminAction(info)),
    [dispatch]
  );
  return [admin, updateAdmin];
}

function useLogin() {
  const dispatch = useDispatch();
  return useCallback(
    async values => dispatch(loginAction(values)),
    [dispatch]
  );
}

function useLogout() {
  const history = useHistory();
  return useCallback(
    async () => {
      await logout();
      message.success('退出登录');
      history.push('/login');
    },
    [history]
  );
}

function useConfirmLogout(username) {
  const logout = useLogout();
  return useCallback(
    () => Modal.confirm({
      title: '确认退出',
      icon: <QuestionCircleOutlined />,
      content: `确定退出登录账号 ${username}？`,
      onOk: logout
    }),
    [logout, username]
  );
}


function useAuth() {
  const history = useHistory();
  const [admin, updateAdminInfo] = useAdmin();
  return useCallback(
    () => {
      if (admin === null) {
        whoAmI().then(res => {
          if (res.status === 'success') {
            updateAdminInfo(res.data);
          } else {
            history.push('/login');
          }
        });
      }
    },
    [history, admin, updateAdminInfo]
  );
}

export { useAdmin, useAuth, useLogin, useLogout, useConfirmLogout }