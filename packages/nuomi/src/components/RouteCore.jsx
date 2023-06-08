import React from 'react';
import { RouterContext } from './Context';
import BaseRoute from './BaseRoute';
import { isFunction } from '../utils';
import { configure } from '../core/nuomi';
import { extendArray } from '../utils/extend';
import { blockData } from '../core/router';
import { RoutePropTypes } from './propTypes';

export default class RouteCore extends React.PureComponent {
  static propTypes = RoutePropTypes;

  static contextType = RouterContext;

  constructor(...args) {
    super(...args);
    this.wrapperRef = React.createRef();
    this.mounted = false;
    this.wrapper = null;
    const { async } = this.props;
    const loaded = !isFunction(async);
    const nuomiProps = extendArray(configure(), [this.props]);
    this.state = {
      // 是否异步加载完，async为函数时为false
      loaded,
      // 是否显示路由组件，异步时为false，因为异步加载的props可能包含onEnter，非异步时，没有onEnter值为true
      visible: loaded ? !nuomiProps.onEnter : false,
      // 异步加载的props
      nuomiProps,
    };
  }

  componentDidMount() {
    this.mounted = true;
    const { wrappers } = this.context;
    const { current } = this.wrapperRef;
    const { loaded, nuomiProps } = this.state;

    if (current) {
      this.wrapper = current;
      wrappers.push(current);
    }

    // 路由加载后，隐藏所有wrapper
    this.hideWrapper();
    if (!loaded) {
      this.loadProps((nextNuomiProps) => {
        // 获取异步加载到的props
        this.visibleHandler(nextNuomiProps, () => {
          this.showWrapper(nextNuomiProps);
          // 合并state
          this.visibleRoute({
            loaded: true,
            nuomiProps: nextNuomiProps,
          });
        });
      });
    } else {
      this.visibleHandler(nuomiProps, () => {
        this.showWrapper(nuomiProps);
        this.visibleRoute();
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { wrappers } = this.context;
    const { location, cache } = this.props;
    const { current } = this.wrapperRef;

    // 清理wrapper
    if (cache !== true && this.wrapper) {
      this.removeWrapper();
      this.wrapper = null;
    } else if (cache === true && !this.wrapper && current) {
      this.wrapper = current;
      wrappers.push(current);
    }
    if (location !== prevProps.location) {
      // 切换当前路由后，隐藏所有wrapper
      this.hideWrapper();
      if (cache === true) {
        // 控制当前路由wrapper显示
        const { nuomiProps } = this.state;
        this.visibleHandler(nuomiProps, () => {
          this.showWrapper(nuomiProps);
        });
      }
    }
  }

  componentWillUnmount() {
    // 防止组件销毁时更新state报错
    this.mounted = false;
    this.removeWrapper();
  }

  // 异步加载props，可以使用require.ensure或import
  loadProps(cb) {
    const { async } = this.props;
    const { nuomiProps } = this.state;
    /**
     * async: ((cb) => {
     *  require.ensure([], (require) => {
     *    cb(require(path).default);
     *  })
     * })
     */
    const loadResult = async((props) => {
      cb(extendArray(nuomiProps, [props]));
    });
    /**
     * async: () => import(path);
     */
    if (loadResult && loadResult instanceof Promise) {
      loadResult.then((module) => cb(extendArray(nuomiProps, [module.default])));
    }
  }

  // 根据onEnter决定是否可以展示组件
  // eslint-disable-next-line class-methods-use-this
  visibleHandler(nuomiProps, cb) {
    if (nuomiProps.onEnter) {
      if (
        nuomiProps.onEnter(() => {
          cb();
        }) === true
      ) {
        cb();
      }
    } else {
      cb();
    }
  }

  visibleRoute(state) {
    const { visible } = this.state;
    if (this.mounted) {
      if (!visible) {
        this.setState({ visible: true, ...state });
      } else if (state) {
        this.setState(state);
      }
    }
  }

  showWrapper(nuomiProps) {
    const { url } = this.props.location;
    if (isFunction(nuomiProps.onLeave)) {
      blockData.callback = (leave, restore, toRoute) => {
        const isLeave = nuomiProps.onLeave(leave, toRoute) !== false;
        if (isLeave) {
          leave(isLeave);
        } else {
          restore(url);
        }
      };
    }

    if (this.wrapper) {
      this.wrapper.style.display = 'block';
    }
  }

  // 移出当前wrapper
  removeWrapper() {
    const { wrappers } = this.context;
    if (this.wrapper) {
      this.context.wrappers = wrappers.filter((wrapper) => wrapper !== this.wrapper);
    }
  }

  hideWrapper() {
    const { wrappers } = this.context;
    wrappers.forEach((wrapper) => {
      wrapper.style.display = 'none';
    });
  }

  getNextProps() {
    const { props } = this;
    const { location } = props;
    const nextProps = { location };
    const { nuomiProps } = this.state;

    ['path', 'cache', 'reload', 'children'].forEach((value) => {
      // 优先使用props
      nextProps[value] = props[value] === undefined ? nuomiProps[value] : props[value];
    });

    if (nextProps.reload === true && typeof location.reload === 'boolean') {
      // 优先使用location.reload
      nextProps.reload = location.reload;
    }

    return nextProps;
  }

  render() {
    const props = this.getNextProps();
    const { cache } = props;
    const { nuomiProps, visible, loaded } = this.state;
    if (cache === true || (loaded && visible)) {
      const baseRoute = <BaseRoute {...nuomiProps} {...props} />;
      if (cache === true) {
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
