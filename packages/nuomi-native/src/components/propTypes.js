import PropTypes from 'prop-types';

export const NuomiNativeProps = {
  id: PropTypes.string,
  state: PropTypes.object,
  reducer: PropTypes.objectOf(PropTypes.func),
  action: PropTypes.objectOf(PropTypes.func),
  render: PropTypes.func,
  onInit: PropTypes.func,
  onShow: PropTypes.func,
};
