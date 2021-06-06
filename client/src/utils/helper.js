import NProgress from "nprogress";
import MarkdownIt from "markdown-it";
import { MIN, HOUR, DAY, ONE_DAY_MS, ONE_HOUR_MS, ONE_MINUTE_MS, TIME_EN_ZH_TABLE, NUMBER_MONTH_ZH_TABLE } from './constants'

export const time2TimeStamp = t => new Date(t).getTime();

export const timeDiff = (t1, t2) => time2TimeStamp(t1) - time2TimeStamp(t2);

export const diff2Minute = diff => Math.ceil(diff / ONE_MINUTE_MS);

export const diff2Hour = diff => Math.ceil(diff / ONE_HOUR_MS);

export const diff2Day = diff => Math.ceil(diff / ONE_DAY_MS);

export const relativeTime = (t1, t2) => {
  const diff = timeDiff(t1, t2 ?? Date.now());
  const abs = Math.abs(diff);
  const relative = {};
  if (abs < ONE_HOUR_MS) {
    relative.diff = diff2Minute(diff);
    relative.unit = MIN;
  } else if (abs < ONE_DAY_MS) {
    relative.diff = diff2Hour(diff);
    relative.unit = HOUR;
  } else {
    relative.diff = diff2Day(diff);
    relative.unit = DAY;
  }
  return relative;
}

export const relativeTime2ZHStr = (t1, t2) => {
  const { diff, unit } = relativeTime(t1, t2);
  const dir = diff > 0 ? '后' : '前';
  return `${Math.abs(diff)} ${TIME_EN_ZH_TABLE[unit]}${dir}`;
}

export const articles2Archives = (articles) => {
  const map = new Map();
  articles.forEach(article => {
    const key = getYearAndMonth(article.createdAt);
    if (!map.has(key)) {
      map.set(key, [article]);
    } else {
      map.set(key, [...map.get(key), article]);
    }
  });
  return map;
}

export const getYearAndMonth = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  return `${year}-${month}`;
}

export const yearAndMonthStr2ZH = str => {
  const [year, month] = str.split('-');
  return `${year} ${NUMBER_MONTH_ZH_TABLE[month]}`;
};

export const md = new MarkdownIt();

export const mdRender = md.render.bind(md);

export const startLoading = () => NProgress.start();

export const doneLoading = () => NProgress.done();

