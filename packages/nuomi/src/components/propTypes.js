import PropTypes from 'prop-types';

export const NuomiPropTypes = {
  id: PropTypes.string,
  state: PropTypes.object,
  store: PropTypes.object,
  reducers: PropTypes.objectOf(PropTypes.func),
  actions: PropTypes.objectOf(PropTypes.func),
  getters: PropTypes.objectOf(PropTypes.func),
  extends: PropTypes.arrayOf(PropTypes.object),
  render: PropTypes.func,
  onInit: PropTypes.func,
  load: PropTypes.func,
};

export const NuomiRoutePropTypes = {
  ...NuomiPropTypes,
  path: PropTypes.string,
  name: PropTypes.string,
};

export const RoutePropTypes = {
  ...NuomiPropTypes,
  path: PropTypes.string,
  name: PropTypes.string,
  cache: PropTypes.oneOf(['state', true, false]),
  reload: PropTypes.bool,
  onEnter: PropTypes.func,
  onShow: PropTypes.func,
  onActivte: PropTypes.func,
  onLeave: PropTypes.func,
};

export const ShapeRoutePropTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export const RouterPropTypes = {
  basename: PropTypes.string,
  type: PropTypes.oneOf(['hash', 'browser']),
};

export const StaticRouterPropTypes = {
  basename: PropTypes.string,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  context: PropTypes.object,
};

export const LinkPropTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reload: PropTypes.bool,
  replace: PropTypes.bool,
};

export const NavLinkPropTypes = {
  ...LinkPropTypes,
  activeClassName: PropTypes.string,
  activeStyle: PropTypes.object,
  isActice: PropTypes.func,
};

export const RedirectPropTypes = {
  from: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reload: PropTypes.bool,
};
