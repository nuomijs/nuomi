import invariant from 'invariant';
import { useContext } from 'react';
import { RouterContext } from '../components/Context';

function useLocation() {
  const { location } = useContext(RouterContext);
  invariant(location, '不允许在 <Router>、<Route>、<NuomiRoute> 外部使用 useLocation');
  return location;
}

export default useLocation;
