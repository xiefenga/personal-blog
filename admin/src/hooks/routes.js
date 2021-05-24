import { message, Modal } from 'antd'
import { whoAmI, logout } from '@/api/login'
import { useCallback, useMemo, useState } from 'react'
import { useAdmin, useLogin, useLogout } from './store'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'

function useGoHome(replace = false) {
  const history = useHistory();
  return useCallback(
    () => replace ? history.replace('/') : history.push('/'),
    [history, replace]
  );
}

function usePaths() {
  const location = useLocation();
  return useMemo(
    () => location.pathname.split('/').slice(1),
    [location]
  );
}

function useRedirect(path) {
  const history = useHistory();
  return useCallback(
    () => history.replace(path),
    [path, history],
  );
}


function useAuth() {
  const [accept, setAccept] = useState(true);
  const history = useHistory();
  const [admin, updateAdminInfo] = useAdmin();
  return [accept, useCallback(
    () => {
      if (admin === null) {
        whoAmI().then(res => {
          if (res.status === 'success') {
            updateAdminInfo(res.data);
          } else {
            history.push('/login');
          }
          setAccept(false);
        });
      } else {
        setAccept(false);
      }
    },
    [history, admin, updateAdminInfo]
  )];
}


function useLoginAndJump(setLoading) {
  const login = useLogin();
  const toHome = useGoHome(true);
  return useCallback(
    async values => {
      setLoading && setLoading(true);
      const { status } = await login(values);
      setLoading && setLoading(false);
      if (status === 'success') {
        message.success('登录成功');
        toHome('/');
      }
    },
    [login, toHome, setLoading]
  );
}


function useConfirmLogout(username = '') {
  const history = useHistory();
  const logoutAdmin = useLogout();
  return useCallback(
    () => Modal.confirm({
      title: '确认退出',
      icon: <QuestionCircleOutlined />,
      content: `确定退出登录账号 ${username}？`,
      onOk: async () => {
        await logout();
        message.success('退出登录');
        history.push('/login');
        logoutAdmin();
      }
    }),
    [history, logoutAdmin, username]
  );
}

export {
  useGoHome,
  usePaths,
  useRedirect,
  useAuth,
  useLoginAndJump as useLogin,
  useConfirmLogout as useLogout
}