import PropTypes from 'prop-types';

export const NuomiPropTypes = {
  id: PropTypes.string,
  state: PropTypes.object,
  data: PropTypes.object,
  store: PropTypes.object,
  reducers: PropTypes.objectOf(PropTypes.func),
  effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  render: PropTypes.func,
  onInit: PropTypes.func,
  async: PropTypes.func,
};

export const NuomiRoutePropTypes = {
  ...NuomiPropTypes,
  pathPrefix: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  path: PropTypes.string,
};

export const ShapeRoutePropTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

export const RoutePropTypes = {
  ...NuomiPropTypes,
  path: PropTypes.string,
  cache: PropTypes.oneOf(['state', true, false]),
  reload: PropTypes.bool,
  onEnter: PropTypes.func,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onLeave: PropTypes.func,
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
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  reload: PropTypes.bool,
  replace: PropTypes.bool,
};

export const NavLinkPropTypes = {
  ...LinkPropTypes,
  path: PropTypes.string,
  activeClassName: PropTypes.string,
  activeStyle: PropTypes.object,
  isActice: PropTypes.func,
};

export const RedirectPropTypes = {
  from: PropTypes.string,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  reload: PropTypes.bool,
};
