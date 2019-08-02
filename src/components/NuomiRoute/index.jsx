import React from 'react';
import PropTypes from 'prop-types';
import BaseRoute from '../BaseRoute';
import { isFunction, isObject, extend } from '../../utils';
import { getParams } from '../../core/router';

class NuomiRoute extends React.PureComponent {
  static propTypes = {
    onBefore: PropTypes.func,
  };

  static wrappers = [];

  constructor(...args) {
    super(...args);
    const { async, data, ...rest } = this.props;
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    const isAsync = isFunction(async);
    this.state = {
      data: { ...data },
      loaded: !isAsync,
      visible: false,
      props: rest,
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

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.visibleWrapperHandler();
    }
  }

  loadProps(cb) {
    const { async, data, ...rest } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      async((props) => {
        const { data: dataProps, ...restProps } = props;
        this.setState(
          {
            loaded: true,
            props: extend(rest, restProps),
            data: { ...data, ...dataProps },
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
    const { location, wrapper } = this.props;
    const { props, visible, loaded, data } = this.state;
    let propsData = data;
    const { data: locationData, reload, ...rest } = location;
    const extraProps = {};
    rest.params = getParams(rest, props.path);

    if (isFunction(locationData)) {
      extraProps.routerLocationCallback = locationData;
    } else if (isObject(locationData)) {
      propsData = {
        ...propsData,
        ...locationData,
      };
    }

    if (reload) {
      extraProps.reload = reload;
    }
    if (wrapper || (loaded && visible)) {
      const routeComponent = (
        <BaseRoute ref={this.ref} {...props} {...extraProps} data={propsData} location={rest} />
      );
      if (wrapper) {
        return (
          <div ref={this.wrapperRef} className="nuomi-route-wrapper">
            {loaded && visible && routeComponent}
          </div>
        );
      }
      return routeComponent;
    }
    return null;
  }
}

export default NuomiRoute;
