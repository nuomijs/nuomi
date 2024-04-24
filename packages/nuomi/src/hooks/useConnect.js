import { useReducer, useContext, useRef } from 'react';
import invariant from 'invariant';
import { NuomiContext } from '../components/Context';
import globalStore, { getStore } from '../core/redux/store';
import { isFunction, shallowEqual } from '../utils';
import useEffect from './useEffect';
import Proxy from '../utils/Proxy';

function useConnect(callback) {
  const { nuomi } = useContext(NuomiContext);
  invariant(nuomi, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useConnect');
  // 获取最近的Nuomi组件store
  const { store } = nuomi;
  // 用于强制更新
  const [, forceRender] = useReducer((s) => s + 1, 0);
  // 返回的状态
  const stateRef = useRef();
  // 依赖收集状态
  const selectedRef = useRef();
  // 获取最新状态
  const getState = function () {
    if (getStore(store.id) != null) {
      if (isFunction(callback)) {
        // 第一个参数是当前Nuomi组件状态，第二个参数是所有组件状态
        const state = callback({ ...store.state, ...store.getters }, globalStore.getState());
        if (state != null) {
          return state;
        }
        return {};
      }
      const state = { ...store.state, ...store.getters };
      if (selectedRef.current) {
        const selectedState = {};
        Object.keys(selectedRef.current).forEach((key) => {
          selectedState[key] = state[key];
        });
        return selectedState;
      }
      return new Proxy(state, {
        get(target, name) {
          if (!selectedRef.current) {
            selectedRef.current = {};
          }
          return (selectedRef.current[name] = target[name]);
        },
      });
    }
  };

  if (!stateRef.current) {
    stateRef.current = getState();
  }

  useEffect(() => {
    // 订阅状态变化触发组件更新
    const unSubcribe = globalStore.subscribe(() => {
      if (getStore(store.id) != null) {
        const newState = getState();
        // 浅比较旧状态与新状态，发生变化则更新组件
        if (shallowEqual(stateRef.current, newState)) {
          return;
        }
        // 记忆状态
        stateRef.current = newState;
        // 强制更新
        forceRender({});
      }
    });
    // 组件卸载时取消订阅
    return function () {
      return unSubcribe();
    };
  }, []);

  return [stateRef.current, store.dispatch];
}

export default useConnect;
