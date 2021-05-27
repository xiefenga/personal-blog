import { useRef, useState, useCallback } from 'react'
import { delay, cancelablePromise } from '@/utils/helper'
import { CLICK_DOUBLECLICK_INTERVAL as INTERVAL } from '@/utils/constants'


export const useForceUpdate = () => {
  const [, setState] = useState({});
  return useCallback(
    () => setState({}),
    []
  );
}

export const useCancelablePromises = () => {
  const pendingPromises = useRef([]);

  const appendPendingPromise = promise =>
    pendingPromises.current = [...pendingPromises.current, promise];

  const removePendingPromise = promise =>
    pendingPromises.current = pendingPromises.current.filter(p => p !== promise);

  const clearPendingPromises = () => pendingPromises.current.map(p => p.cancel());

  return {
    appendPendingPromise,
    removePendingPromise,
    clearPendingPromises,
  };
};

export const useCorrectDoubleClick = (onClick, onDoubleClick) => {
  const api = useCancelablePromises();

  const handleClick = (...args) => {
    api.clearPendingPromises();
    const waitForClick = cancelablePromise(delay(INTERVAL));
    api.appendPendingPromise(waitForClick);

    return waitForClick.promise
      .then(() => {
        api.removePendingPromise(waitForClick);
        onClick && onClick(...args);
      })
      .catch(errorInfo => {
        api.removePendingPromise(waitForClick);
        if (!errorInfo.isCanceled) {
          throw errorInfo.error;
        }
      });
  };

  const handleDoubleClick = (...args) => {
    api.clearPendingPromises();
    onDoubleClick && onDoubleClick(...args);
  };

  return [handleClick, handleDoubleClick];
};


