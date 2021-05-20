import { message } from 'antd'
import { useLogin } from './admin'
import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'


function useToHome(replace = false) {
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

function useLoginAndJump(setLoading) {
  const login = useLogin();
  const toHome = useToHome(true);
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

export { useToHome, usePaths, useLoginAndJump as useLogin }