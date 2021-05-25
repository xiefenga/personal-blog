import { login } from '@/api/login'
import { SUCCESS } from '@/utils/constants'

export const SET_ADMIN = 'SET_ADMIN';

export const LOGOUT = 'LOGOUT';

export const loginAction = values => async dispatch => {
  const resp = await login(values);
  const { status, data } = resp;
  if (status === SUCCESS) {
    dispatch(setAdminAction(data));
  }
  return resp;
}

export const setAdminAction = (payload) => ({
  type: SET_ADMIN,
  payload
});

export const logoutAction = (payload) => ({
  type: LOGOUT,
  payload
})


