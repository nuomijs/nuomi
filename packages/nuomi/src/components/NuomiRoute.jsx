import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import { match, removeMatchMapData } from '../core/router';
import { NuomiRoutePropTypes } from './propTypes';

export default class NuomiRoute extends React.PureComponent {
  static propTypes = NuomiRoutePropTypes;

  componentWillUnmount() {
    const { path } = this.props;
    if (path) {
      removeMatchMapData(path);
    }
  }

  render() {
    const { path } = this.props;
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NuomiRoute>');

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
                <Nuomi {...this.props} location={matchLocation} />
              </RouterContext.Provider>
            );
          }
          return null;
        }}
      </RouterContext.Consumer>
    );
  }
}
