import defaultProps from './defaultProps';
import extend from '../../utils/extend';

let newProps = defaultProps;

const nuomi = (props) => {
  newProps = extend(newProps, props);
};

export const getDefaultProps = () => newProps;

nuomi.getDefaultProps = getDefaultProps;

export default nuomi;
