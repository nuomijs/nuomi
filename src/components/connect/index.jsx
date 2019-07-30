import React from 'react';
import PropTypes from 'prop-types';
import store from '../../core/redux/store';
import { isFunction, isObject } from '../../utils';

const defaultMergeProps = (props, stateProps, dispatchProps) => {
  return { ...props, ...stateProps, ...dispatchProps };
};

const connect = (mapStateToProps, mapDispatch, merge, options) => {
  const mapDispatchToProps = isFunction(mapDispatch) ? mapDispatch : () => {};
  const mergeProps = isFunction(merge) ? merge : defaultMergeProps;
  return (WrapperComponent) => {
    return class Connect extends React.PureComponent {
      static contextTypes = {
        nuomiStore: PropTypes.object,
      };

      constructor(...args) {
        super(...args);
        this.updateState = null;
        if (isObject(options) && options.withRef === true) {
          this.ref = React.createRef();
        }
        if (isFunction(mapStateToProps)) {
          // 初始化state
          this.state = this.getState();
          // 订阅更新状态
          this.unSubcribe = store.subscribe(() => {
            if (this.updateState) {
              this.updateState(this.getState());
            }
          });
        }
      }

      componentDidMount() {
        this.updateState = (state) => {
          this.setState(state);
        };
      }

      componentWillUnmount() {
        if (this.unSubcribe) {
          // 设置为null是为了防止组件在销毁时执行setState导致报错
          this.updateState = null;
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
