import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import { match, removeMatchMapData } from '../core/router';
import { NuomiRoutePropTypes } from './propTypes';

export default class NuomiRoute extends React.PureComponent {
  static propTypes = NuomiRoutePropTypes;

  constructor(...args) {
    super(...args);
    this.context = {};
  }

  componentWillUnmount() {
    const { path } = this.props;
    if (path) {
      removeMatchMapData(path);
    }
    if (this.context.matched === this) {
      this.context.matched = null;
    }
  }

  render() {
    const { path } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NuomiRoute>');
          this.context = context;

          // 同一个context只匹配一次
          const allowMatch = !context.matched || context.matched === this;
          let matchLocation = match(context.location, { path }, true, true);

          if (!allowMatch) {
            matchLocation = false;
          }

          if (matchLocation) {
            context.matched = this;
            return (
              <RouterContext.Provider value={{ ...context, matched: null }}>
                <RouterContext.Consumer>
                  {(cxt) => <Nuomi {...this.props} location={matchLocation} context={cxt} />}
                </RouterContext.Consumer>
              </RouterContext.Provider>
            );
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}
