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
        const { nuomiStore } = this.context;
        if (isObject(options) && options.withRef === true) {
          this.ref = React.createRef();
        }
        this.state = {};
        if (isFunction(mapStateToProps)) {
          const listener = () => {
            if (this.subcribe) {
              const state = mapStateToProps(nuomiStore.getState(), store.getState());
              this.subcribe(isObject(state) ? state : {});
            }
          };
          listener();
          this.unSubcribe = store.subscribe(listener);
        }
      }

      componentDidMount() {
        this.subcribe = (state) => {
          this.setState(state);
        };
      }

      componentWillUnmount() {
        if (this.unSubcribe) {
          // 设置为null是为了防止组件在销毁时执行setState导致报错
          this.subcribe = null;
          this.unSubcribe();
        }
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

      subcribe(state) {
        this.state = state;
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
