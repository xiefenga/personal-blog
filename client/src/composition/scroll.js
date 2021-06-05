import { SCROLL_PER_DIS } from "@/utils/constants";

export const useScrollPageY = target => {

  let id = null;

  // 1 向下 -1 向上
  const dir = target - window.pageYOffset > 0 ? 1 : -1;

  const scroll = () => {
    id = requestAnimationFrame(() => {
      const curPos = window.pageYOffset;
      if ((target - curPos) * dir <= 0) {
        window.scrollTo(0, target);
        return;
      }
      window.scrollTo(0, curPos + (SCROLL_PER_DIS * dir));
      scroll();
    });
  };

  const cancel = () => cancelAnimationFrame(id);
  return [scroll, cancel];
}

window.useScrollPageY = useScrollPageY;