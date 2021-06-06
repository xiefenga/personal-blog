import { getSiteInfo } from '@/api/site'
import { SUCCESS } from '@/utils/constants'

export const SET_SITE_INFO = 'SET_SITE_INFO';

export const setSiteInfoAction = (payload) => ({
  type: SET_SITE_INFO,
  payload
});

export const getSiteInfoAction = () => async dispatch => {
  const { status, data } = await getSiteInfo();
  if (status === SUCCESS) {
    dispatch(setSiteInfoAction(data));
  }
  return status === SUCCESS;
}
