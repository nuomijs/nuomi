import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';
import { isFunction, isObject } from '../../utils';

class BaseRoute extends BaseNuomi {
  static propTypes = {
    id: PropTypes.string,
    reload: PropTypes.bool,
    state: PropTypes.object,
    data: PropTypes.object,
    store: PropTypes.object,
    location: PropTypes.object,
    reducers: PropTypes.objectOf(PropTypes.func),
    effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    render: PropTypes.func,
    onEnter: PropTypes.func,
    onInit: PropTypes.func,
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onLeave: PropTypes.func,
  };

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { store } = props;
    const isReload = store.id && props.reload === true;
    const isChange = prevProps.location !== props.location;
    if (isReload) {
      this.replaceState();
    }
    if (isChange) {
      this.routerChange();
    }
    if (isReload) {
      this.nuomiInit();
    }
  }

  initialize() {
    const { store, reload } = this.props;
    // 初始化
    if (!store.id) {
      this.createStore();
      this.createReducer();
      this.routerChange(true);
      this.nuomiInit();
      // 路由刷新
    } else if (reload === true) {
      this.replaceState();
      this.routerChange(true);
      this.nuomiInit();
      // 路由切换
    } else {
      this.routerChange();
    }
  }

  replaceState() {
    const { props } = this;
    props.store.dispatch({
      type: '_replaceState',
      payload: props.state,
    });
  }

  routerChange(isReload) {
    const { props } = this;
    const { location, onChange } = props;
    if (isFunction(location.data)) {
      location.data(props);
    }
    if (isFunction(onChange)) {
      onChange.call(props);
    } else if (isObject(onChange)) {
      Object.keys(onChange).forEach((key) => {
        const callback = onChange[key];
        if (isFunction(callback)) {
          // 首次加载和刷新时不执行带有$前缀的回调
          if (isReload && key.indexOf('$') === 0) {
            return;
          }
          callback.call(props);
        }
      });
    }
  }
}

export default BaseRoute;
