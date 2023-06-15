import BaseNuomi from './BaseNuomi';
import { isFunction } from '../utils';
import { RoutePropTypes } from './propTypes';
import { callShowedListener, addReloadListener } from '../core/router';

export default class BaseRoute extends BaseNuomi {
  static propTypes = RoutePropTypes;

  reloadRoute = () => {
    const { store } = this.props;
    if (store && store.id) {
      this.reload();
      this.routerChange();
    }
  };

  getContext() {
    const context = super.getContext();
    return { ...context, reload: this.reloadRoute };
  }

  initialize() {
    this.createStore();
    this.execInit();
    this.routerChange();
    callShowedListener();
  }

  routerChange(activate) {
    const { props } = this;
    if (isFunction(props.onShow)) {
      props.onShow(this.getContext());
    }
    if (activate && isFunction(props.onActivate)) {
      props.onActivate(this.getContext());
    }
  }

  componentWillUnmount() {
    const { cache } = this.props;
    if (cache !== 'state' && cache !== true) {
      this.removeStore();
    }
    this.removeListener();
  }

  componentDidMount() {
    this.unListener = addReloadListener((currentLocation) => {
      const { reload, location } = this.props;
      if (reload && location === currentLocation) {
        this.reloadRoute();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props === prevProps) {
      return;
    }
    const isChange = prevProps.location !== props.location;
    if (isChange) {
      this.routerChange(true);
      callShowedListener();
    }
  }
}
