import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';
import { isFunction, isObject } from '../../utils';

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
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onLeave: PropTypes.func,
  };

  static childContextTypes = {
    nuomiStore: PropTypes.object,
    sourceProps: PropTypes.object,
  };

  componentDidUpdate(nextProps) {
    const { props } = this;
    const { store } = props;
    const isReload = store.id && nextProps.reload === true;
    const isChange = nextProps.location !== props.location;
    if (isReload) {
      this.replaceState();
    }
    if (isChange) {
      this.execLocationCallback();
    }
    if (isReload) {
      this.nuomiInit();
    }
    if (isChange) {
      this.routerChange();
    }
  }

  initialize() {
    const { store, reload } = this.props;
    if (!store.id) {
      this.createStore();
      this.createReducer();
      this.execLocationCallback();
      this.nuomiInit();
    } else if (reload === true) {
      this.replaceState();
      this.execLocationCallback();
      this.nuomiInit();
    } else {
      this.execLocationCallback();
    }
    this.routerChange();
  }

  replaceState() {
    const { props } = this;
    props.store.dispatch({
      type: '_replaceState',
      payload: props.state,
    });
  }

  routerChange() {
    const { props } = this;
    if (isFunction(props.onChange)) {
      props.onChange();
    } else if (isObject(props.onChange)) {
      Object.values(props.onChange).forEach((change) => {
        if (isFunction(change)) {
          change.call(props);
        }
      });
    }
  }

  execLocationCallback() {
    const { props } = this;
    if (props.routerLocationCallback) {
      props.routerLocationCallback(props);
    }
  }
}

export default BaseRoute;
