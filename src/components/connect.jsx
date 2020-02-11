import React from 'react';
import invariant from 'invariant';
import { isFunction, isObject } from '../utils';
// eslint-disable-next-line import/no-named-default
import { default as rootStore, getStore } from '../core/redux/store';
import { NuomiContext } from './Context';

const defaultMergeProps = (props, stateProps, dispatchProps) => {
  return { ...props, ...stateProps, ...dispatchProps };
};

const connect = (...args) => {
  const [mapStateToProps, mapDispatch, merge, options] = args;
  const mapDispatchToProps = isFunction(mapDispatch) ? mapDispatch : () => {};
  const mergeProps = isFunction(merge) ? merge : defaultMergeProps;
  return (WrapperComponent) => {
    return class Connect extends React.PureComponent {
      static contextType = NuomiContext;

      static displayName = `connect(...)(${WrapperComponent.displayName || WrapperComponent.name})`;

      constructor(...arg) {
        super(...arg);
        this.mounted = false;
        const { nuomiProps } = this.context;
        invariant(
          nuomiProps,
          `不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 ${Connect.displayName}`,
        );
        if (isObject(options) && options.withRef === true) {
          this.ref = React.createRef();
        }
        if (isFunction(mapStateToProps)) {
          // 初始化state
          this.state = this.getState();
          // 订阅更新状态
          this.unSubcribe = rootStore.subscribe(() => {
            if (this.mounted && getStore(nuomiProps.store.id)) {
              this.setState(this.getState());
            }
          });
        }
      }

      componentDidMount() {
        this.mounted = true;
      }

      componentWillUnmount() {
        if (this.unSubcribe) {
          // 为了防止组件在销毁时执行setState导致报错
          this.mounted = false;
          this.unSubcribe();
        }
      }

      getState() {
        const { store } = this.context.nuomiProps;
        const state = mapStateToProps(store.getState(), rootStore.getState());
        return isObject(state) ? state : {};
      }

      getWrappedInstance() {
        if (this.ref) {
          return this.ref.current;
        }
        return null;
      }

      getProps() {
        const { store } = this.context.nuomiProps;
        return mergeProps(this.props, this.state, mapDispatchToProps(store.dispatch)) || this.props;
      }

      render() {
        const { store } = this.context.nuomiProps;
        const props = {
          ...this.getProps(),
          ref: this.ref,
          dispatch: store.dispatch,
        };
        return <WrapperComponent {...props} />;
      }
    };
  };
};

export default connect;
