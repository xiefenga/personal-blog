import { getSiteInfo } from "@/api/site"
import { reactive, readonly, toRefs } from "vue"

const props = ['author', 'github', 'mail', 'avatar', 'aboutMe', 'siteName', 'beian'];

const initState = props.reduce((acc, cur) => {
  acc[cur] = '';
  return acc;
}, {});

const state = reactive(initState);

export const siteInfo = toRefs(readonly(state));

export const fetchSiteInfo = async () => {
  const { data } = await getSiteInfo();
  props.forEach(prop => state[prop] = data[prop]);
}

