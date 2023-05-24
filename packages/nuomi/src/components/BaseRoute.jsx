import BaseNuomi from './BaseNuomi';
import { isFunction, isObject } from '../utils';
import { RoutePropTypes } from './propTypes';
import { removeReducer } from '../core/redux/reducer';

export default class BaseRoute extends BaseNuomi {
  static propTypes = RoutePropTypes;

  componentWillUnmount() {
    const { store, cache } = this.props;
    if (cache !== 'state' && cache !== true) {
      removeReducer(store.id);
      store.id = null;
    }
    this.removeListener();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { store } = props;
    const isReload = store.id && props.reload === true;
    const isChange = prevProps.route !== props.route;
    if (isReload) {
      this.replaceState();
      this.routerChange();
      this.nuomiInit();
    } else if (isChange) {
      this.routerChange();
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
      payload: { ...props.state },
    });
  }

  routerChange() {
    const { props } = this;
    const { onChange, store } = props;
    if (isFunction(onChange)) {
      onChange.call({ store });
    }
  }
}
