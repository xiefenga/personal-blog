import { SUCCESS } from '@/utils/constants'
import { useCallback, useState } from "react"
import { getSiteInfo, updateSiteInfo } from '@/api/site'

export const STATE_NAME = 'site_info';

export const useSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState({});
  const get = useCallback(
    async () => {
      const { status, data } = await getSiteInfo();
      if (status === SUCCESS) {
        setSiteInfo(data);
      }
      return status === SUCCESS;
    },
    []
  );

  const update = useCallback(
    async (value) => {
      const { status, data } = await updateSiteInfo(value);
      if (status === SUCCESS) {
        setSiteInfo(data);
      }
      return status === SUCCESS;
    },
    []
  );

  const state = { siteInfo, getSiteInfo: get, updateSiteInfo: update };

  return [STATE_NAME, state];
}