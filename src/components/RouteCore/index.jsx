import React from 'react';
import PropTypes from 'prop-types';
import BaseRoute from '../BaseRoute';
import { isFunction, isObject } from '../../utils';
import extend from '../../utils/extend';
import { getParams } from '../../core/router';

let wrappers = [];

class RouteCore extends React.PureComponent {
  static propTypes = {
    onBefore: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    const { async, data, ...rest } = this.props;
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    this.mounted = false;
    const isAsync = isFunction(async);
    this.state = {
      data: { ...data },
      loaded: !isAsync,
      visible: false,
      props: rest,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { current } = this.wrapperRef;
    if (current) {
      wrappers.push(current);
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

  componentWillUnmount() {
    this.mounted = false;
  }

  loaded(props, cb) {
    const { async, data, ...rest } = this.props;
    const { data: dataProps, ...restProps } = props;
    if (this.mounted) {
      this.setState(
        {
          loaded: true,
          props: extend(rest, restProps),
          data: { ...data, ...dataProps },
        },
        cb,
      );
    }
  }

  loadProps(cb) {
    const { async } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      const loadResult = async((props) => {
        this.loaded(props, cb);
      });
      if (loadResult && loadResult instanceof Promise) {
        loadResult.then((module) => this.loaded(module.default, cb));
      }
    } else {
      cb && cb();
    }
  }

  removeWrapper() {
    const { current } = this.wrapperRef;
    if (current) {
      wrappers = wrappers.filter((wrapper) => wrapper !== current);
    }
  }

  visibleRoute() {
    if (this.mounted) {
      this.setState({ visible: true });
    }
  }

  visibleWrapperHandler() {
    const { current } = this.wrapperRef;
    wrappers.forEach((wrapper) => {
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
      /* eslint-disable no-underscore-dangle */
      extraProps._routerChangeCallback = locationData;
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
      const baseRoute = (
        <BaseRoute ref={this.ref} {...props} {...extraProps} data={propsData} location={rest} />
      );
      if (wrapper) {
        return (
          <div ref={this.wrapperRef} className="nuomi-route-wrapper">
            {loaded && visible && baseRoute}
          </div>
        );
      }
      return baseRoute;
    }
    return null;
  }
}

export default RouteCore;
