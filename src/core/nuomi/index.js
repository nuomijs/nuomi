import defaultProps from './defaultProps';
import extend from './extend';

let newProps = defaultProps;

const config = (props) => {
  newProps = extend(newProps, props);
};

export const getDefaultProps = () => newProps;

export default {
  config,
  getDefaultProps,
  extend,
};
