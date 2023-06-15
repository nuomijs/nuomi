import React from 'react';
import warning from 'warning';
import { createReducer, removeReducer } from '../core/redux/reducer';
import globalStore, {
  getStore, setStore, initialiseState, INITIALISE_STATE,
} from '../core/redux/store';
import { isObject, isFunction } from '../utils';
import { extend } from '../utils/extend';
import Proxy from '../utils/Proxy';
import { NuomiContext } from './Context';
import globalWindow from '../utils/globalWindow';
import { NuomiPropTypes } from './propTypes';

export default class BaseNuomi extends React.PureComponent {
  static propTypes = NuomiPropTypes;

  static contextType = NuomiContext;

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    this.unListener = null;
    this.unSubcribe = null;
    this.action = null;
    this.state = {
      key: 0,
    };
    this.initialize();
  }

  getId() {
    const { id, store } = this.props;
    if (store.id) {
      return store.id;
    }
    if (!id) {
      return `@@nuomi_${++BaseNuomi.nuomiId}`;
    }
    if (getStore(id)) {
      throw new Error(`id为 ${id} 的store已被定义，请重新命名！`);
    }
    return id;
  }

  getDefaultState() {
    const { state, action } = this.props;
    const loading = {};
    Object.keys(action).forEach((key) => {
      if (key && key.startsWith('$')) {
        loading[key] = false;
      }
    });
    return {
      ...state,
      loading: {
        ...loading,
        ...state.loading,
      },
    };
  }

  createReducer() {
    const { store, reducer } = this.props;
    let defaultState = (globalWindow[INITIALISE_STATE] || initialiseState || {})[store.id];
    if (defaultState) {
      defaultState = extend({ state: store.state }, { state: defaultState }).state;
    } else {
      defaultState = store.state;
    }
    createReducer(store.id, (state = defaultState, { type, payload }) => {
      const typePrefix = `${store.id}/`;
      if (type.indexOf(typePrefix) === 0) {
        const key = type.replace(typePrefix, '');
        if (reducer[key]) {
          return reducer[key](state, payload);
        }
        warning(
          false,
          `未定义名称为 ${type} 的reducer，如果你想调用action中的方法，请使用
          \nglobalStore.getStore('${store.id}').dispatch('${key}', payload)`,
        );
      }
      return state;
    });
  }

  updateGetter() {
    const { store, getter: getters } = this.props;
    const getter = {};
    const proxy = new Proxy(getters, {
      get(target, name) {
        const getterFunc = target[name];
        if (isFunction(getterFunc)) {
          return function (e) {
            // 计算过再次调用使用已计算值
            return getter[name] === undefined ? getterFunc.call(proxy, e) : getter[name];
          };
        }
        return function () {};
      },
    });
    Object.keys(getters).forEach((key) => {
      getter[key] = proxy[key](store.state);
    });
    store.getter = getter;
  }

  createSubcribe() {
    const { store } = this.props;
    this.unSubcribe = globalStore.subscribe(() => {
      if (store.state !== store.getState()) {
        store.state = store.getState();
        this.updateGetter();
      }
    });
  }

  createStore() {
    const { props } = this;
    const { store, reducer } = props;

    store.id = this.getId();

    store.dispatch = async function (type, payload) {
      const { action } = props;

      // type中包含斜杠视为调用其他模块方法
      const splitIndex = String(type).indexOf('/');
      if (splitIndex === -1) {
        if (isObject(action) && isFunction(action[type])) {
          // 带有loading功能的方法队列
          const loadingQueue = [];
          const loadingType = `${store.id}/@loading`;
          try {
            // 通过代理可以知道调用的方法内部调用情况，调用的函数本身以及函数内部调用的方法或者属性都会走get
            const proxy = new Proxy(action, {
              // name是当前调用的方法或者属性名
              get(target, name) {
                const actionFunc = action[name];
                if (isFunction(actionFunc)) {
                  // $开头的方法进行loading特殊处理
                  if (name.startsWith('$')) {
                    // 获取上一次调用的方法
                    const prevName = loadingQueue.slice(-1)[0];
                    // 开启loading
                    const loadingPayload = { [name]: true };
                    // 当前方法调用，说明上一个方法肯定调用结束了，因此关闭上一个loading
                    // 需排除最外层调用方法，该方法在finally中处理
                    if (prevName !== type && prevName) {
                      loadingPayload[prevName] = false;
                      // 从队列中移除执行完的loading方法名
                      loadingQueue.pop();
                    }
                    // 更新loading状态
                    globalStore.dispatch({
                      type: loadingType,
                      payload: loadingPayload,
                    });
                    // 将当前loading方法名添加到队列中，如果最后执行的方法带有loading，在finally中处理
                    loadingQueue.push(name);
                  }
                  return function (p) {
                    return actionFunc.call(proxy, store, p);
                  };
                }
                // 返回当前调用对象
                return actionFunc;
              },
            });
            return await proxy[type](payload);
          } catch (e) {
            if (e && e.constructor !== Object) {
              throw e;
            }
          } finally {
            // 所有方法全部执行完，检测队列中是否有值，关闭剩余的loading
            if (store.id && loadingQueue.length) {
              // 最初的loading
              const loadingPayload = { [loadingQueue[0]]: false };
              // 末尾的loading
              const lastEffect = loadingQueue.slice(-1)[0];
              if (lastEffect) {
                loadingPayload[lastEffect] = false;
              }
              globalStore.dispatch({
                type: loadingType,
                payload: loadingPayload,
              });
            }
          }
          // action不存在就执行reducer中方法直接更新状态
        } else if (reducer[type] && store.id) {
          return globalStore.dispatch({
            type: `${store.id}/${type}`,
            payload,
          });
        } else {
          warning(false, `action和reducer中不存在 ${type}`);
          return action;
        }
        // dispatch其他模块方法
      } else {
        const id = type.substr(0, splitIndex);
        const otherAction = type.substr(splitIndex + 1);
        const $store = getStore(id);
        if ($store) {
          const dispatchReturn = await $store.dispatch(otherAction, payload);
          return dispatchReturn;
        }
        warning(false, `未创建id为 ${id} 的store`);
      }
    };

    store.restoreState = () => {
      globalStore.dispatch({
        type: `${store.id}/@replace`,
        payload: this.getDefaultState(),
      });
      return store.state;
    };

    store.getState = () => {
      const globalState = globalStore.getState();
      if (globalState) {
        return globalState[store.id] || this.getDefaultState();
      }
      return this.getDefaultState();
    };

    store.state = store.getState();

    store.getter = {};

    store.commit = function (...args) {
      let [type, payload] = args;
      if (args.length) {
        if (args.length === 1) {
          type = '@update';
          payload = args[0];
        }
        const splitIndex = String(type).indexOf('/');
        if (splitIndex === -1) {
          if (reducer[type] && store.id) {
            globalStore.dispatch({
              type: `${store.id}/${type}`,
              payload,
            });
          }
        } else {
          const id = type.substr(0, splitIndex);
          const otherReducer = type.substr(splitIndex + 1);
          const $store = getStore(id);
          if ($store) {
            return $store.commit(otherReducer, payload);
          }
        }
      }
      return store.state;
    };

    setStore(store.id, store);
    this.updateGetter();
    this.createReducer();
    this.createSubcribe();
  }

  replaceState() {
    const { props } = this;
    props.store.restoreState();
  }

  reload = () => {
    const { props } = this;
    if (props.store.id) {
      if (props.context) {
        props.context.matched = null;
      }
      this.setState(({ key }) => ({
        key: key + 1,
      }));
      props.store.restoreState();
      this.execInit();
    }
  };

  initialize() {
    this.createStore();
    this.execInit();
  }

  removeListener() {
    if (isFunction(this.unSubcribe)) {
      this.unSubcribe();
      this.unSubcribe = null;
    }
    if (isFunction(this.unListener)) {
      this.unListener();
      this.unListener = null;
    }
  }

  removeStore() {
    const { store } = this.props;
    removeReducer(store.id);
    Object.keys(store).forEach((key) => {
      delete store[key];
    });
  }

  getContext() {
    const { store, location } = this.props;
    const { reload } = this;
    const nuomi = {
      store,
      location,
      reload,
    };
    if (this.context) {
      nuomi.parent = this.context.nuomi;
    }
    return nuomi;
  }

  execInit() {
    const { props } = this;
    if (isFunction(props.onInit)) {
      props.onInit(this.getContext());
    }
  }

  getChildren() {
    const { render, children } = this.props;
    if (render) {
      const Component = render;
      return <Component>{children}</Component>;
    }
    return children;
  }

  componentWillUnmount() {
    this.removeStore();
    this.removeListener();
  }

  render() {
    const { state } = this;
    const context = this.getContext();
    const children = this.getChildren();
    if (children != null) {
      return (
        <NuomiContext.Provider key={state.key} value={{ nuomi: context }}>
          {children}
        </NuomiContext.Provider>
      );
    }
    return null;
  }
}
