import React from 'react';
import invariant from 'invariant';
import { isFunction, isObject } from '../utils';
import globalStore, { getStore } from '../core/redux/store';
import { NuomiContext } from './Context';

function defaultMergeProps(props, stateProps, dispatchProps) {
  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
  };
}

function connect(...args) {
  const [mapStateToProps, mapDispatch, merge, options] = args;
  const mapDispatchToProps = isFunction(mapDispatch) ? mapDispatch : () => {};
  const mergeProps = isFunction(merge) ? merge : defaultMergeProps;
  return (WrapperComponent) => class Connect extends React.PureComponent {
      static contextType = NuomiContext;

      static displayName = `connect()(${WrapperComponent.displayName || WrapperComponent.name})`;

      constructor(...arg) {
        super(...arg);
        this.mounted = false;
        const { nuomi } = this.context;
        invariant(!!nuomi, `不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 ${Connect.displayName}`);
        if (isObject(options) && options.withRef === true) {
          this.ref = React.createRef();
        }
        this.state = this.getState();
        this.unSubcribe = globalStore.subscribe(() => {
          if (getStore(nuomi.store.id) != null) {
            const state = this.getState();
            if (this.mounted) {
              this.setState(state);
            } else {
              this.state = state;
            }
          }
        });
      }

      componentDidMount() {
        this.mounted = true;
      }

      componentWillUnmount() {
        this.mounted = false;
        if (this.unSubcribe) {
          this.unSubcribe();
        }
      }

      getState() {
        const { store } = this.context.nuomi;
        if (getStore(store.id) != null) {
          if (isFunction(mapStateToProps)) {
            // 第一个参数是当前Nuomi组件状态，第二个参数是所有组件状态
            const state = mapStateToProps({ ...store.state, ...store.getter }, globalStore.getState());
            if (state != null) {
              return state;
            }
            return {};
          }
          return { ...store.state, ...store.getter };
        }
      }

      getWrappedInstance() {
        if (this.ref) {
          return this.ref.current;
        }
        return null;
      }

      getProps() {
        const { store } = this.context.nuomi;
        return mergeProps(this.props, this.state, mapDispatchToProps(store.dispatch)) || this.props;
      }

      render() {
        const { store } = this.context.nuomi;
        const props = {
          ...this.getProps(),
          ref: this.ref,
          dispatch: store.dispatch,
        };
        return <WrapperComponent {...props} />;
      }
  };
}

export default connect;
