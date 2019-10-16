import defaultProps from './defaultProps';
import extend from '../../utils/extend';

let newProps = defaultProps;

export const getDefaultProps = () => newProps;

export const config = (props) => {
  newProps = extend(newProps, props);
};

export default {
  config,
  getDefaultProps,
  extend,
};
