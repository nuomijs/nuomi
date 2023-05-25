import invariant from 'invariant';
import { useContext } from 'react';
import { NuomiContext } from '../components/Context';

const useNuomi = () => {
  const { nuomiProps } = useContext(NuomiContext);
  invariant(nuomiProps, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useNuomi');
  return [nuomiProps];
};

export default useNuomi;
