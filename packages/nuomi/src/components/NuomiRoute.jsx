import React from 'react';
import invariant from 'invariant';
import { RouterContext } from './Context';
import Nuomi from './Nuomi';
import { match } from '../core/router';
import { NuomiRoutePropTypes } from './propTypes';

export default class NuomiRoute extends React.PureComponent {
  static propTypes = NuomiRoutePropTypes;

  constructor(...args) {
    super(...args);
    this.context = {};
    this.state = {
      mounted: false,
    };
  }

  componentWillUnmount() {
    if (this.context.matched === this) {
      this.context.matched = null;
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
    });
  }

  render() {
    const { path, name } = this.props;
    const { mounted } = this.state;
    if (!mounted) {
      return null;
    }
    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(context, '不允许在 <Router> 外部使用 <NuomiRoute>');
          this.context = context;

          // 同一个context只匹配一次
          const allowMatch = !context.matched || context.matched === this;
          let matchLocation = match(context.location, { path, name }, true);

          if (!allowMatch) {
            matchLocation = false;
          }

          if (matchLocation) {
            context.matched = this;
            return (
              <RouterContext.Provider value={{ ...context, location: matchLocation, matched: null }}>
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
