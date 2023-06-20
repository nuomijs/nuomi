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
    const { onShow } = this.props;
    const context = this.getContext();
    if (isFunction(onShow)) {
      this.unListener = this.context.addListener('focus', () => {
        onShow(context);
      });
      onShow(context);
    }
  }
}

BaseNuomi.contextType = NavigationContext;
