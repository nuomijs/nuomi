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
    const { onShow, onActivate } = this.props;
    if (isFunction(onShow)) {
      onShow(this.getContext());
    }
    if (activate && isFunction(onActivate)) {
      onActivate(this.getContext());
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
      if (reload !== false && location === currentLocation) {
        this.reloadRoute();
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (props === prevProps) {
      return;
    }
    const { location, reload } = props;
    const isChange = prevProps.location !== location;
    if (isChange) {
      if (reload !== false && location.reload === true) {
        this.reloadRoute();
      } else {
        this.routerChange(true);
      }
      callShowedListener();
    }
  }
}
