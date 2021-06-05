import { getSiteInfo } from "@/api/site"
import { reactive, readonly, toRefs } from "vue"

const _author = reactive({
  name: '',
  github: '',
  mail: '',
  about: ''
});

const _siteinfo = reactive({
  name: '',
  beian: ''
});

const _statistics = reactive({
  articles: 0,
  tags: 0,
  categories: 0
});


export const author = toRefs(readonly(_author));

export const siteInfo = toRefs(readonly(_siteinfo));

export const statistics = toRefs(readonly(_statistics));

export const fetchSiteInfo = async () => {
  const { data: info } = await getSiteInfo();
  _author.name = info.author;
  _author.github = info.github;
  _author.mail = info.mail;
  _author.about = info.aboutMe;
  _siteinfo.name = info.siteName;
  _siteinfo.beian = info.beian;
  _statistics.articles = info.articles;
  _statistics.tags = info.tags;
  _statistics.categories = info.categories;
}

