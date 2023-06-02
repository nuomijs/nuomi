import BaseNuomiSuper from 'nuomi/lib/components/BaseNuomi';
import { isFunction } from 'nuomi/lib/utils';
// eslint-disable-next-line import/no-unresolved
import { NavigationContext } from '@react-navigation/native';

export default class BaseNuomi extends BaseNuomiSuper {
  componentWillUnmount() {
    super.componentWillUnmount();
    if (this.unListenerChange != null) {
      this.unListenerChange();
    }
  }

  initialize() {
    this.createStore();
    this.createReducer();
    this.nuomiInit();
    this.routerChange();
  }

  routerChange() {
    const { props } = this;
    if (isFunction(props.onShow)) {
      this.unListenerChange = this.context.addListener('focus', () => {
        props.onShow(props);
      });
      props.onShow(props);
    }
  }
}

BaseNuomi.contextType = NavigationContext;
