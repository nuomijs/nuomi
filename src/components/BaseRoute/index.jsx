import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';

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

  /* eslint-disable camelcase */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { store } = props;
    const isReload = store.id && nextProps.reload === true;
    const isChange = nextProps.location !== props.location;
    if (isReload) {
      this.resetState();
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
      this.resetState();
      this.execLocationCallback();
      this.nuomiInit();
    } else {
      this.execLocationCallback();
    }
    this.routerChange();
  }

  resetState() {
    const { props } = this;
    props.store.dispatch({
      type: 'setState',
      payload: props.state,
    });
  }

  routerChange() {
    const { props } = this;
    if (props.onChange) {
      props.onChange();
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
