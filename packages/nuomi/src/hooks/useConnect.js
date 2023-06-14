import { useReducer, useContext, useRef } from 'react';
import invariant from 'invariant';
import { NuomiContext } from '../components/Context';
import globalStore, { getStore } from '../core/redux/store';
import { isFunction, shallowEqual } from '../utils';
import useEffect from './useEffect';

function useConnect(callback) {
  const { nuomi } = useContext(NuomiContext);
  invariant(nuomi, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useConnect');
  // 获取最近的Nuomi组件store
  const { store } = nuomi;
  // 用于强制更新
  const [, forceRender] = useReducer((s) => s + 1, 0);
  // 用于记忆旧状态
  const selectedState = useRef();
  // 获取最新状态
  // eslint-disable-next-line consistent-return
  const getState = function () {
    if (getStore(store.id)) {
      if (isFunction(callback)) {
        // 第一个参数是当前Nuomi组件状态，第二个参数是所有组件状态
        return callback({ ...store.state, getter: store.getter }, globalStore.getState());
      }
      return { ...store.state, getter: store.getter };
    }
  };

  // 当前组件状态
  if (!selectedState.current) {
    selectedState.current = getState();
  }

  useEffect(() => {
    // 订阅状态变化触发组件更新
    const unSubcribe = globalStore.subscribe(() => {
      const newState = getState();
      // 浅比较旧状态与新状态，发生变化则更新组件
      if (shallowEqual(selectedState.current, newState)) {
        return;
      }
      // 记忆状态
      selectedState.current = newState;
      // 强制更新
      forceRender({});
    });
    // 组件卸载时取消订阅
    return function () {
      return unSubcribe();
    };
  }, []);

  return [selectedState.current, store.dispatch];
}

export default useConnect;
