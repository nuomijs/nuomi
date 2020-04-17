import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import router, { match } from '../core/router';
import { restorePath } from '../utils/parser';
import { isObject } from '../utils';
import { RedirectPropTypes } from './propTypes';

export default class Redirect extends React.PureComponent {
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

  render() {
    const { from, to, reload } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <Redirect>');

          const { matched, location, staticContext } = context;

          if (to && !context.redirecting && !this.redirected) {
            if ((from && match(location, from)) || (!matched && !from)) {
              this.redirected = true;
              // 防止同时执行多个Redirect
              context.redirecting = true;
              router.replace(to, reload);
              // 服务器渲染时捕获重定向URL
              if (staticContext) {
                staticContext.url = isObject(to) ? restorePath(to) : to;
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
