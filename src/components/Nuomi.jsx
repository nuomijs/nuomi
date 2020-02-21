import React from 'react';
import BaseNuomi from './BaseNuomi';
import nuomi, { getDefaultProps } from '../core/nuomi';
import { isFunction } from '../utils';
import { NuomiPropTypes } from './propTypes';

export default class Nuomi extends React.PureComponent {
  static propTypes = NuomiPropTypes;
  static defaultProps = {
    state: {},
    data: {},
    reducers: {},
  };

  constructor(...args) {
    super(...args);
    this.mounted = false;
    this.store = {};
    const { async, ...rest } = this.props;
    const isAsync = isFunction(async);
    this.state = {
      loaded: !isAsync,
      nuomiProps: nuomi.extend(getDefaultProps(), rest),
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.loadProps();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loaded(props) {
    const { nuomiProps } = this.state;
    if (this.mounted === true) {
      this.setState({
        loaded: true,
        nuomiProps: nuomi.extend(nuomiProps, props),
      });
    }
  }

  loadProps() {
    const { async } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      const loadResult = async((props) => {
        this.loaded(props);
      });
      if (loadResult && loadResult instanceof Promise) {
        loadResult.then((module) => this.loaded(module.default));
      }
    }
  }

  render() {
    const { loaded, nuomiProps } = this.state;
    const { children } = this.props;
    if (loaded) {
      return (
        <BaseNuomi {...nuomiProps} store={this.store}>
          {children}
        </BaseNuomi>
      );
    }
    return null;
  }
}
