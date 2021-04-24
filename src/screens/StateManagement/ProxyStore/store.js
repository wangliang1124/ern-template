import stores from './stores';
import callReactHooks from './useReactHooks';
import { addProxy } from './util';

export default addProxy(
  {},
  {
    get(target, key) {
      //   if (!stores[key]) throw new Error(`Not found the store: ${key}.`);
      if (!stores[key]) {
        return {};
      }
      callReactHooks(key);
      return stores[key];
    },
  },
);
