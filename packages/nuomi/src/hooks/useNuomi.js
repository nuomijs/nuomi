import invariant from 'invariant';
import { useContext } from 'react';
import { NuomiContext } from '../components/Context';

function useNuomi() {
  const { nuomi } = useContext(NuomiContext);
  invariant(nuomi, '不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 useNuomi');
  return nuomi;
}

export default useNuomi;
