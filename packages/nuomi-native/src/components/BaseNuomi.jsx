import BaseNuomiSuper from 'nuomi/lib/components/BaseNuomi';
import { isFunction } from 'nuomi/lib/utils';
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
    this.execInit();
    this.routerChange();
  }

  routerChange() {
    const { props } = this;
    const nuomiProps = this.getNuomiProps();
    if (isFunction(props.onShow)) {
      this.unListenerChange = this.context.addListener('focus', () => {
        props.onShow(nuomiProps);
      });
      props.onShow(nuomiProps);
    }
  }
}

BaseNuomi.contextType = NavigationContext;
