import { useContext, useRef } from 'react';
import { NuomiContext } from '../components/Context';
import { getLocation } from '../core/router';

const useNuomi = () => {
  const { nuomiProps, nuomiRouteProps } = useContext(NuomiContext);
  if (nuomiRouteProps) {
    return nuomiRouteProps;
  }

  const cacheProps = useRef();
  // 防止每次组件更新都重新计算
  if (!cacheProps.current) {
    cacheProps.current = {
      ...nuomiProps,
      location: getLocation(),
    };
  }

  return cacheProps.current;
};

export default useNuomi;
