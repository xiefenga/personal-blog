import { login } from '@/api/login'

export const SET_ADMIN = 'SET_ADMIN';

export const loginAction = values => async dispatch => {
  const resp = await login(values);
  const { status, data } = resp;
  if (status === 'success') {
    dispatch(setAdminAction(data));
  }
  return resp;
}

export const setAdminAction = (payload) => ({
  type: SET_ADMIN,
  payload
});

