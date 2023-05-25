import React from 'react';
import router, { combinePath } from '../core/router';
import { LinkPropTypes } from './propTypes';
import { isFunction } from '../utils';

export class Link extends React.PureComponent {
  static propTypes = LinkPropTypes;

  static defaultProps = {
    to: '',
    replace: false,
    reload: false,
  };

  onClick = (e) => {
    e.preventDefault();
    const {
      to, reload, replace, onClick,
    } = this.props;
    if (isFunction(onClick) && onClick(e) === false) {
      return;
    }
    router[replace ? 'replace' : 'push'](to, reload);
  };

  render() {
    const {
      to, reload, replace, forwardRef, ...rest
    } = this.props;
    return <a href={combinePath(to)} {...rest} onClick={this.onClick} ref={forwardRef} />;
  }
}

export default React.forwardRef((props, ref) => <Link {...props} forwardRef={ref} />);
