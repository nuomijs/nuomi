import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import router from '../core/router';
import parser from '../utils/parser';
import { isObject } from '../utils';
import { RedirectPropTypes } from './propTypes';

class Redirect extends React.PureComponent {
  static propTypes = RedirectPropTypes;

  static defaultProps = {
    from: '',
    to: '',
    reload: false,
  };

  constructor(...args) {
    super(...args);
    // 防止死循环
    this.redirected = false;
  }

  matchPath({ pathname }) {
    const { from } = this.props;
    return pathname === parser.replacePath(from);
  }

  render() {
    const { from, to, reload } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Redirect>');
          const { matched, location, staticContext } = context;
          if (to && !context.redirecting && !this.redirected) {
            if ((from && this.matchPath(location)) || (!matched && !from)) {
              this.redirected = true;
              context.redirecting = true; // 防止同时执行多个Redirect
              router.replace(to, reload);
              // 服务器渲染时捕获重定向URL
              if (staticContext) {
                staticContext.url = isObject(to) ? parser.restore(to) : to;
              }
            }
          } else if (this.redirected) {
            this.redirected = false;
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Redirect;
