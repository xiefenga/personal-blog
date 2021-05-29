import { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export const useGoHome = (rep = false) => {
  const history = useHistory();
  return useCallback(
    (replace = false) => (rep || replace) ? history.replace('/') : history.push('/'),
    [rep, history]
  );
}

export const usePaths = () => {
  const location = useLocation();
  return useMemo(
    () => location.pathname.split('/').slice(1),
    [location]
  );
}

export const useRedirect = (url = '/') => {
  const history = useHistory();
  return useCallback(
    path => history.replace(path ?? url),
    [history, url],
  );
}
