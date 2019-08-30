import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { isFunction, isObject } from '../../utils';
import store, { getStore } from '../../core/redux/store';

const defaultMergeProps = (props, stateProps, dispatchProps) => {
  return { ...props, ...stateProps, ...dispatchProps };
};

const connect = (...args) => {
  const [mapStateToProps, mapDispatch, merge, options] = args;
  const mapDispatchToProps = isFunction(mapDispatch) ? mapDispatch : () => {};
  const mergeProps = isFunction(merge) ? merge : defaultMergeProps;
  return (WrapperComponent) => {
    return class Connect extends React.PureComponent {
      static contextTypes = {
        nuomiStore: PropTypes.object,
      };

      static displayName = `connect(...)(${WrapperComponent.displayName || WrapperComponent.name})`;

      constructor(...arg) {
        super(...arg);
        this.mounted = false;
        const { nuomiStore } = this.context;
        invariant(
          nuomiStore,
          `不允许在 <Route>、<Nuomi>、<NuomiRoute> 外部使用 ${Connect.displayName}`,
        );
        if (isObject(options) && options.withRef === true) {
          this.ref = React.createRef();
        }
        if (isFunction(mapStateToProps)) {
          // 初始化state
          this.state = this.getState();
          // 订阅更新状态
          this.unSubcribe = store.subscribe(() => {
            if (this.mounted && getStore(nuomiStore.id)) {
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
        const { nuomiStore } = this.context;
        const state = mapStateToProps(nuomiStore.getState(), store.getState());
        return isObject(state) ? state : {};
      }

      getWrappedInstance() {
        if (this.ref) {
          return this.ref.current;
        }
        return null;
      }

      getProps() {
        const { nuomiStore } = this.context;
        return (
          mergeProps(this.props, this.state, mapDispatchToProps(nuomiStore.dispatch)) || this.props
        );
      }

      render() {
        const { nuomiStore } = this.context;
        const props = {
          ...this.getProps(),
          ref: this.ref,
          dispatch: nuomiStore.dispatch,
        };
        return <WrapperComponent {...props} />;
      }
    };
  };
};

export default connect;
