import BaseNuomiSuper from 'nuomi/lib/components/BaseNuomi';
import { isFunction, isObject } from 'nuomi/lib/utils';
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
    this.routerChange();
    this.nuomiInit();
  }

  routerChange() {
    const { props } = this;
    const { onChange } = props;
    if (onChange != null) {
      const change = (isInit) => {
        if (isFunction(onChange)) {
          onChange.call(props);
        } else if (isObject(onChange)) {
          Object.keys(onChange).forEach((key) => {
            const callback = onChange[key];
            if (isFunction(callback)) {
              // 首次加载不执行带有$前缀的回调
              if (isInit && key.indexOf('$') === 0) {
                return;
              }
              callback.call(props);
            }
          });
        }
      };

      // 监听首次不执行回调
      let isInit = true;
      this.unListenerChange = this.context.addListener('focus', () => {
        if (!isInit) {
          change();
        } else {
          isInit = false;
        }
      });

      change(true);
    }
  }
}

BaseNuomi.contextType = NavigationContext;
