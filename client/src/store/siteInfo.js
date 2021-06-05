import { getSiteInfo } from "@/api/site"
import { ref, reactive, readonly, toRefs } from "vue"

const author = reactive({
  author: '',
  github: '',
  mail: '',
});

const site = ref('');

const about = ref('');

export const authorInfo = toRefs(readonly(author));

export const siteName = readonly(site);

export const aboutMe = readonly(about);

export const fetchSiteInfo = async () => {
  const { data: info } = await getSiteInfo();
  author.author = info.author;
  author.github = info.github;
  author.mail = info.mail;
  site.value = info.siteName;
  about.value = info.aboutMe;
}

