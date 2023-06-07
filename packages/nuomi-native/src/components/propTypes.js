import PropTypes from 'prop-types';

export const NuomiNativeProps = {
  id: PropTypes.string,
  state: PropTypes.object,
  reducers: PropTypes.objectOf(PropTypes.func),
  effects: PropTypes.objectOf(PropTypes.func),
  render: PropTypes.func,
  onInit: PropTypes.func,
  onShow: PropTypes.func,
};
