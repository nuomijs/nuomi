import { useReducer, useContext, useEffect, useRef } from 'react';
import { NuomiContext } from '../components/Context';
// eslint-disable-next-line import/no-named-default
import { default as rootStore, getStore } from '../core/redux/store';
import { isFunction, shallowEqual } from '../utils';

const useSelector = (callback) => {
  // 用于强制更新
  const [, forceRender] = useReducer((s) => s + 1, 0);
  // 获取最近的Nuomi组件store
  const {
    nuomiProps: { store },
  } = useContext(NuomiContext);
  // 用于记忆旧状态
  const selectedState = useRef();
  // 获取最新状态
  const getState = () => {
    if (getStore(store.id)) {
      if (isFunction(callback)) {
        // 第一个参数是当前Nuomi组件状态，第二个参数是所有组件状态
        return callback(store.getState(), rootStore.getState());
      }
      return store.getState();
    }
  };

  // 当前组件状态
  const state = selectedState.current || getState();

  useEffect(() => {
    // 订阅状态变化触发组件更新
    const unSubcribe = rootStore.subscribe(() => {
      const newState = getState();
      // 浅比较旧状态与新状态，发生变化则更新组件
      if (shallowEqual(state, newState)) {
        return;
      }
      // 记忆状态
      selectedState.current = newState;
      // 强制更新
      forceRender({});
    });
    // 组件卸载时取消订阅
    return () => unSubcribe();
  }, []);

  return [state, store.dispatch];
};

export default useSelector;
