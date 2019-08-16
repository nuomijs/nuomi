import React from 'react';
import PropTypes from 'prop-types';
import { createReducer } from '../../core/redux/reducer';
import rootStore, { getStore, setStore } from '../../core/redux/store';
import { isObject, isFunction } from '../../utils';
import EffectsProxy from '../../utils/effectsProxy';

class BaseNuomi extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    state: PropTypes.object,
    data: PropTypes.object,
    store: PropTypes.object,
    reducers: PropTypes.objectOf(PropTypes.func),
    effects: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    render: PropTypes.func,
    onInit: PropTypes.func,
  };

  static childContextTypes = {
    nuomiStore: PropTypes.object,
    nuomiProps: PropTypes.object,
  };

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    this.unListener = null;
    this.effects = null;
    this.initialize();
  }

  getChildContext() {
    const { store } = this.props;
    return {
      nuomiStore: store,
      nuomiProps: this.props,
    };
  }

  getId() {
    BaseNuomi.nuomiId += 1;
    const { id } = this.props;
    const defaultId = `nuomi_${BaseNuomi.nuomiId}`;
    return id || defaultId;
  }

  initialize() {
    this.createStore();
    this.createReducer();
    this.nuomiInit();
  }

  getEffects() {
    const { props } = this;
    const { effects, store } = props;
    if (isObject(effects)) {
      return {
        ...effects,
        getNuomiProps: () => this.props,
        getState: store.getState,
        dispatch: store.dispatch,
      };
    }
    if (isFunction(effects)) {
      return props.effects() || {};
    }
    return {};
  }

  createStore() {
    const { props } = this;
    const { store, reducers } = props;

    store.id = this.getId();

    store.dispatch = async ({ type, payload }) => {
      if (!this.effects) {
        this.effects = this.getEffects();
      }
      // type中包含斜杠视为调用其他模块方法
      const splitIndex = type.indexOf('/');
      if (splitIndex === -1) {
        if (isObject(this.effects) && isFunction(this.effects[type])) {
          // 带有loading功能的方法队列
          const loadingQueue = [];
          try {
            // 通过代理可以知道调用的方法内部调用情况，调用的函数本身以及函数内部调用的方法或者属性都会走get
            const effectsProxy = EffectsProxy(this.effects, {
              // name是当前调用的方法或者属性名
              get: (target, name) => {
                const effect = this.effects[name];
                // $开头的方法进行loading特殊处理
                if (isFunction(effect) && name.indexOf('$') === 0) {
                  // 获取上一次调用的方法
                  const prevEffect = loadingQueue.slice(-1)[0];
                  // 开启loading
                  const loadingPayload = { [name]: true };
                  // 当前方法调用，说明上一个方法肯定调用结束了，因此关闭上一个loading
                  // 需排除最外层调用方法，该方法在finally中处理
                  if (prevEffect !== type && prevEffect) {
                    loadingPayload[prevEffect] = false;
                    // 从队列中移除执行完的loading方法名
                    loadingQueue.pop();
                  }
                  // 更新loading状态
                  rootStore.dispatch({
                    type: `${store.id}/_updateLoading`,
                    payload: loadingPayload,
                  });
                  // 将当前loading方法名添加到队列中，如果最后执行的方法带有loading，在finally中处理
                  loadingQueue.push(name);
                }
                // 返回当前调用对象
                return effect;
              },
            });
            return await effectsProxy[type](payload);
          } catch (e) {
            if (e instanceof Error) {
              throw e;
            }
          } finally {
            // 所有方法全部执行完，检测队列中是否有值，关闭剩余的loading
            if (loadingQueue.length) {
              // 最初的loading
              const loadingPayload = { [loadingQueue[0]]: false };
              // 末尾的loading
              const lastEffect = loadingQueue.slice(-1)[0];
              if (lastEffect) {
                loadingPayload[lastEffect] = false;
              }
              rootStore.dispatch({
                type: `${store.id}/_updateLoading`,
                payload: loadingPayload,
              });
            }
          }
          // effects不存在就执行reducers中方法直接更新状态
        } else if (reducers[type]) {
          rootStore.dispatch({
            type: `${store.id}/${type}`,
            payload,
          });
        }
        // dispatch其他模块方法
      } else {
        const id = type.substr(0, splitIndex);
        const effect = type.substr(splitIndex + 1);
        const $store = getStore(id);
        if ($store) {
          const res = await $store.dispatch({
            type: effect,
            payload,
          });
          return res;
        }
      }
    };

    store.getState = () => rootStore.getState()[store.id];

    setStore(store.id, store);
  }

  createReducer() {
    const { store, state: defaultState, reducers } = this.props;
    createReducer(store.id, (state = defaultState, action) => {
      const { type } = action;
      const typePrefix = `${store.id}/`;
      if (type.indexOf(typePrefix) === 0) {
        const key = type.replace(typePrefix, '');
        if (reducers[key]) {
          return reducers[key](state, action);
        }
      }
      return state;
    });
  }

  removeListener() {
    if (isFunction(this.unListener)) {
      this.unListener();
      this.unListener = null;
    }
  }

  nuomiInit() {
    const { props } = this;
    this.removeListener();
    if (props.onInit) {
      this.unListener = props.onInit();
    }
  }

  render() {
    const { props } = this;
    const children = props.render ? props.render() : props.children;
    return children || null;
  }
}

export default BaseNuomi;
