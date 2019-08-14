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
    effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    render: PropTypes.func,
    onBefore: PropTypes.func,
    onInit: PropTypes.func,
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onLeave: PropTypes.func,
  };

  static childContextTypes = {
    nuomiStore: PropTypes.object,
    nuomiProps: PropTypes.object,
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
    if (!store.id) {
      this.createStore();
      this.createReducer();
      this.routerChange();
      this.nuomiInit();
    } else if (reload === true) {
      this.replaceState();
      this.routerChange();
      this.nuomiInit();
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

  routerChange() {
    const { props } = this;
    const { location } = props;
    if (isFunction(location.data)) {
      location.data(props);
    }
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
}

export default BaseRoute;
