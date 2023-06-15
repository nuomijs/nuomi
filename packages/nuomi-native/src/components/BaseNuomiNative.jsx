import BaseNuomi from 'nuomi/lib/components/BaseNuomi';
import { isFunction } from 'nuomi/lib/utils';
import { NavigationContext } from '@react-navigation/native';

export default class BaseNuomiNative extends BaseNuomi {
  initialize() {
    this.createStore();
    this.execInit();
    this.routerChange();
  }

  routerChange() {
    const { props } = this;
    const context = this.getContext();
    if (isFunction(props.onShow)) {
      this.unListener = this.context.addListener('focus', () => {
        props.onShow(context);
      });
      props.onShow(context);
    }
  }
}

BaseNuomi.contextType = NavigationContext;
