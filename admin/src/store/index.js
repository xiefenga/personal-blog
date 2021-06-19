import { useTags } from './tags'
import { useAdmin } from './admin'
import { useSiteInfo } from './site'
import { useArticle } from './article'
import { useCategories } from './categories'
import { createContainer } from 'unstated-next'

const useHooks = () => {
  const hooks = [
    useTags,
    useAdmin,
    useSiteInfo,
    useArticle,
    useCategories
  ];
  const states = {};
  hooks.forEach(hook => {
    const [STATE_NAME, state] = hook();
    states[STATE_NAME] = state;
  });
  window.store = states;
  return states;
}

const Store = createContainer(useHooks);

export default Store;

export const {
  Provider,
  useContainer: useStore
} = Store;


