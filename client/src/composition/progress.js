import NProgress from "nprogress";

export const useProgress = () => {
  const start = () => NProgress.start();

  const done = () => NProgress.done();

  return { start, done };
}