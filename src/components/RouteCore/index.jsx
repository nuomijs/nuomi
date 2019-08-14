import React from 'react';
import PropTypes from 'prop-types';
import BaseRoute from '../BaseRoute';
import { isFunction, isObject } from '../../utils';
import extend from '../../utils/extend';
import { getDefaultProps } from '../../core/nuomi';

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
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    this.mounted = false;
    const { async, ...rest } = this.props;
    const loaded = !isFunction(async);
    const nuomiProps = extend(getDefaultProps(), rest);
    this.state = {
      loaded,
      // 异步加载props时默认为false
      visible: loaded ? !nuomiProps.onBefore : false,
      nuomiProps,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { current } = this.wrapperRef;
    if (current) {
      wrappers.push(current);
    }
    this.hideWrapper();
    this.loadProps(() => {
      this.visibleHandler(() => {
        this.showWrapper();
        this.visibleRoute();
      });
    });
  }

  componentDidUpdate(prevProps) {
    const { location, wrapper } = this.props;
    if (location !== prevProps.location) {
      this.hideWrapper();
      if (wrapper === true) {
        this.visibleHandler(() => {
          this.showWrapper();
        });
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loaded(props, cb) {
    const { nuomiProps } = this.state;
    const newNuomiProps = extend(nuomiProps, props);
    if (this.mounted) {
      this.setState(
        {
          loaded: true,
          // onBefore不存在则展示页面
          visible: !newNuomiProps.onBefore,
          nuomiProps: newNuomiProps,
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

  visibleHandler(cb) {
    const { nuomiProps } = this.state;
    if (nuomiProps.onBefore) {
      if (
        nuomiProps.onBefore(() => {
          cb();
        }) === true
      ) {
        cb();
      }
    } else {
      cb();
    }
  }

  visibleRoute() {
    const { visible } = this.state;
    if (this.mounted && !visible) {
      this.setState({ visible: true });
    }
  }

  showWrapper() {
    const { current } = this.wrapperRef;
    if (current) {
      current.style.display = 'block';
    }
  }

  removeWrapper() {
    const { current } = this.wrapperRef;
    if (current) {
      wrappers = wrappers.filter((wrapper) => wrapper !== current);
    }
  }

  hideWrapper() {
    wrappers.forEach((wrapper) => {
      // eslint-disable-next-line no-param-reassign
      wrapper.style.display = 'none';
    });
  }

  restoreData() {
    const { nuomiProps } = this.state;
    const { data } = nuomiProps;
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
  }

  // 设置data临时数据，保存设置前的数据
  setData(locationData) {
    const { nuomiProps } = this.state;
    const { data } = nuomiProps;
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
    const { nuomiProps, visible, loaded } = this.state;
    const { data, reload = nuomiProps.reload } = location;
    this.restoreData();
    if (isObject(data)) {
      this.setData(data);
    }
    if (wrapper || (loaded && visible)) {
      const baseRoute = (
        <BaseRoute ref={this.ref} {...nuomiProps} reload={reload} location={location} />
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
