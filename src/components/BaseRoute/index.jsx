import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';
import { listener, matchPath } from '../../core/router';

class BaseRoute extends BaseNuomi {
  static propTypes = {
    id: PropTypes.string,
    wrapper: PropTypes.bool,
    reload: PropTypes.bool,
    state: PropTypes.object,
    data: PropTypes.object,
    store: PropTypes.object,
    reducers: PropTypes.object,
    effects: PropTypes.func,
    render: PropTypes.func,
    onBefore: PropTypes.func,
    onInit: PropTypes.func,
    onChange: PropTypes.func,
    onLeave: PropTypes.func,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { store, reload } = nextProps;
    // 刷新页面会重新创建reducer
    if (store.id && reload === true && reload !== prevState.reload) {
      this.createReducer();
    }
    return { reload: false };
  }

  constructor(...args) {
    super(...args);
    const { props } = this;
    const { store, path } = props;
    this.state = { reload: false };
    if (!store.id) {
      this.createStore();
      this.createReducer();
      this.state.reload = true;
    }
    this.unListener = listener((location) => {
      if (props.onChange && matchPath(location, path)) {
        props.onChange();
      }
    });
  }

  componentWillUnmount() {
    this.unListener();
  }

  createReducer() {
    super.createReducer();
    const { props } = this;
    const { routerLocationCallback } = props;
    if (routerLocationCallback) {
      routerLocationCallback(props);
    }
    if (props.onInit) {
      props.onInit();
    }
  }
}

export default BaseRoute;
