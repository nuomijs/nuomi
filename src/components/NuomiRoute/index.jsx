import React from 'react';
import PropTypes from 'prop-types';
import BaseRoute from '../BaseRoute';
import RouterContext from '../RouterContext';
import { isFunction, isObject, extend } from '../../utils';
import { getProps } from '../../core/nuomi';

class NuomiRoute extends React.PureComponent {
  static defaultProps = {
    onBefore: null,
  };

  static propTypes = {
    onBefore: PropTypes.func,
  };

  static wrappers = [];

  constructor(...args) {
    super(...args);
    const { async, ...rest } = this.props;
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    const isAsync = isFunction(async);
    this.state = {
      loaded: !isAsync,
      visible: false,
      props: isAsync ? rest : extend(getProps(), rest),
    };
  }

  componentDidMount() {
    const { current } = this.wrapperRef;
    if (current) {
      NuomiRoute.wrappers.push(current);
    }
    this.visibleWrapperHandler();
    this.loadProps(() => {
      const { props } = this.state;
      if (props.onBefore) {
        if (
          props.onBefore(() => {
            this.visibleRoute();
          }) === true
        ) {
          this.visibleRoute();
        }
      } else {
        this.visibleRoute();
      }
    });
  }

  loadProps(cb) {
    const { async, ...rest } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      async((props) => {
        this.setState(
          {
            loaded: true,
            props: extend(getProps(), { ...rest, ...props }),
          },
          cb,
        );
      });
    } else {
      cb && cb();
    }
  }

  removeWrapper() {
    const { current } = this.wrapperRef;
    if (current) {
      NuomiRoute.wrappers = NuomiRoute.wrappers.filter((wrapper) => wrapper !== current);
    }
  }

  visibleRoute() {
    this.setState({ visible: true });
  }

  visibleWrapperHandler() {
    const { current } = this.wrapperRef;
    NuomiRoute.wrappers.forEach((wrapper) => {
      const elem = wrapper;
      elem.style.display = current === elem ? 'block' : 'none';
    });
  }

  render() {
    const { props, visible, loaded } = this.state;
    const { wrapper } = props;
    let propsData = props.data;
    const routeComponent = (
      <RouterContext.Consumer>
        {({ location: { data } }) => {
          if (isObject(data)) {
            propsData = {
              ...propsData,
              ...data,
            };
          }
          return <BaseRoute ref={this.ref} {...props} data={propsData} />;
        }}
      </RouterContext.Consumer>
    );
    if (wrapper) {
      return (
        <div ref={this.wrapperRef} className="nuomi-route-wrapper">
          {loaded && visible && routeComponent}
        </div>
      );
    }
    if (loaded && visible) {
      return routeComponent;
    }
    return null;
  }
}

export default NuomiRoute;
