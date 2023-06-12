import React from 'react';
import BaseNuomi from './BaseNuomi';
import { configure } from '../core/nuomi';
import { extendArray } from '../utils/extend';
import { isFunction } from '../utils';
import { NuomiPropTypes } from './propTypes';

export default class Nuomi extends React.PureComponent {
  static propTypes = NuomiPropTypes;

  static defaultProps = {
    state: {},
    reducers: {},
    effects: {},
  };

  constructor(...args) {
    super(...args);
    this.mounted = false;
    this.store = {};
    const { load } = this.props;
    const isAsync = isFunction(load);
    this.state = {
      loaded: !isAsync,
      nuomiProps: extendArray(configure(), [this.props]),
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
        nuomiProps: extendArray(nuomiProps, [props]),
      });
    }
  }

  loadProps() {
    const { load } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      const loadResult = load((props) => {
        this.loaded(props);
      });
      if (loadResult && loadResult instanceof Promise) {
        loadResult.then((module) => this.loaded(module.default));
      }
    }
  }

  getNextProps() {
    const { props } = this;
    const { location } = props;
    return { location };
  }

  render() {
    const props = this.getNextProps();
    const { loaded, nuomiProps } = this.state;
    const { children } = this.props;
    if (loaded) {
      return (
        <BaseNuomi {...nuomiProps} {...props} store={this.store}>
          {children}
        </BaseNuomi>
      );
    }
    return null;
  }
}
