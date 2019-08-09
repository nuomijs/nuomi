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

  static contextTypes = {
    routeTempData: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    const { async, ...rest } = this.props;
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    this.mounted = false;
    const isAsync = isFunction(async);
    this.state = {
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
    const { async, ...rest } = this.props;
    if (this.mounted) {
      this.setState(
        {
          loaded: true,
          props: extend(rest, props),
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

  getData() {
    const { props } = this.state;
    const { data } = props;
    const { routeTempData } = this.context;
    // 删除临时数据
    if (routeTempData.temp) {
      const tempDataKeys = Object.keys(routeTempData.temp);
      if (tempDataKeys.length) {
        tempDataKeys.forEach((key) => {
          delete data[key];
        });
        routeTempData.temp = null;
      }
    }
    // 还原旧数据
    if (routeTempData.prev) {
      const prevDataKeys = Object.keys(routeTempData.prev);
      if (prevDataKeys.length) {
        prevDataKeys.forEach((key) => {
          data[key] = this.oldData[key];
        });
        routeTempData.prev = null;
      }
    }

    return data;
  }

  // 设置data临时数据，保存设置前的数据
  setData(locationData) {
    const { props } = this.state;
    const { data } = props;
    const { routeTempData } = this.context;
    const keys = Object.keys(locationData);
    if (keys.length) {
      const dataKeys = Object.keys(data);
      // 存储临时数据
      routeTempData.temp = locationData;
      // 存储之前的data数据，为了临时数据使用完后还原
      routeTempData.prev = {};
      keys.forEach((key) => {
        if (dataKeys.includes(key)) {
          routeTempData.prev[key] = dataKeys[key];
        }
        data[key] = locationData[key];
      });
    }
  }

  render() {
    const { location, wrapper } = this.props;
    const { props, visible, loaded } = this.state;
    const { data: locationData, reload, ...rest } = location;
    const extraProps = {};
    const data = this.getData();
    rest.params = getParams(rest, props.path);
    if (isFunction(locationData)) {
      /* eslint-disable no-underscore-dangle */
      extraProps._routerChangeCallback = locationData;
    } else if (isObject(locationData)) {
      this.setData(locationData);
    }
    if (reload) {
      extraProps.reload = reload;
    }
    if (wrapper || (loaded && visible)) {
      const baseRoute = (
        <BaseRoute ref={this.ref} {...props} {...extraProps} data={data} location={rest} />
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
