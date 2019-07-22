import defaultProps from './defaultProps';
import { extend } from '../../utils';

let commonProps = defaultProps;

const nuomi = (props) => {
  commonProps = extend(commonProps, props);
};

export const getProps = () => commonProps;

export default nuomi;
