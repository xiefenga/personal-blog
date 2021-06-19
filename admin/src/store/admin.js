import { SUCCESS } from '@/utils/constants'
import { useState, useCallback } from "react"
import { login, logout, whoAmI } from '@/api/login'

export const STATE_NAME = 'admin';

export const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const loginAdmin = useCallback(
    async info => {
      const resp = await login(info);
      const { status, data } = resp;
      if (status === SUCCESS) {
        setAdmin(data);
      }
      return status === SUCCESS;
    },
    []
  );
  const logoutAdmin = useCallback(
    async () => {
      await logout();
      setAdmin(null);
    },
    []
  );
  const auth = useCallback(
    async () => {
      const { status, data } = await whoAmI();
      if (status === SUCCESS) {
        setAdmin(data);
      }
      return status === SUCCESS;
    },
    []
  );
  const state = { admin, auth, login: loginAdmin, logout: logoutAdmin };
  return [STATE_NAME, state]
}