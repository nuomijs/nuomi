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
    this.effects = null;
    this.initialize();
  }

  componentWillUnmount() {
    const { store } = this.props;
    removeReducer(store.id);
    store.id = null;
    this.removeListener();
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

  initialize() {
    this.createStore();
    this.createReducer();
    this.execInit();
  }

  createStore() {
    const { props } = this;
    const { store, reducers } = props;

    store.id = this.getId();

    store.dispatch = async (action) => {
      const { type, payload } = action;
      const { effects } = props;

      // type中包含斜杠视为调用其他模块方法
      const splitIndex = String(type).indexOf('/');
      if (splitIndex === -1) {
        if (isObject(effects) && isFunction(effects[type])) {
          // 带有loading功能的方法队列
          const loadingQueue = [];
          const loadingType = `${store.id}/@loading`;
          try {
            // 通过代理可以知道调用的方法内部调用情况，调用的函数本身以及函数内部调用的方法或者属性都会走get
            const proxy = new Proxy(effects, {
              // name是当前调用的方法或者属性名
              get: (target, name) => {
                const effect = effects[name];
                if (isFunction(effect)) {
                  // $开头的方法进行loading特殊处理
                  if (name.startsWith('$')) {
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
                    globalStore.dispatch({
                      type: loadingType,
                      payload: loadingPayload,
                    });
                    // 将当前loading方法名添加到队列中，如果最后执行的方法带有loading，在finally中处理
                    loadingQueue.push(name);
                  }
                  return (e) => target[name](store, e);
                }
                // 返回当前调用对象
                return effect;
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
          // effects不存在就执行reducers中方法直接更新状态
        } else if (reducers[type] && store.id) {
          return globalStore.dispatch({
            type: `${store.id}/${type}`,
            payload,
          });
        } else {
          warning(false, `effects和reducers中不存在 ${type}`);
          return action;
        }
        // dispatch其他模块方法
      } else {
        const id = type.substr(0, splitIndex);
        const effect = type.substr(splitIndex + 1);
        const $store = getStore(id);
        if ($store) {
          const dispatchReturn = await $store.dispatch({
            type: effect,
            payload,
          });
          return dispatchReturn;
        }
        warning(false, `未创建id为 ${id} 的store`);
      }
    };

    store.restoreState = () => {
      globalStore.dispatch({
        type: `${store.id}/@replace`,
        payload: props.state,
      });
      return store.getState();
    };

    store.getState = () => globalStore.getState()[store.id] || props.state;

    store.setState = (...args) => {
      let [type, payload] = args;
      if (args.length) {
        if (args.length === 1) {
          type = '@update';
          payload = args[0];
        }
        const splitIndex = String(type).indexOf('/');
        if (splitIndex === -1) {
          if (reducers[type] && store.id) {
            globalStore.dispatch({
              type: `${store.id}/${type}`,
              payload,
            });
          }
        } else {
          const id = type.substr(0, splitIndex);
          const reducer = type.substr(splitIndex + 1);
          const $store = getStore(id);
          if ($store) {
            return $store.setState(reducer, payload);
          }
        }
      }
      return store.getState();
    };

    setStore(store.id, store);
  }

  createReducer() {
    const {
      store, state: stateData, reducers, effects,
    } = this.props;
    const loading = {};
    Object.keys(effects).forEach((key) => {
      if (key && key.startsWith('$')) {
        loading[key] = false;
      }
    });
    stateData.loading = {
      ...loading,
      ...stateData.loading,
    };
    let defaultState = (globalWindow[INITIALISE_STATE] || initialiseState || {})[store.id];
    if (defaultState) {
      defaultState = extend({ state: stateData }, { state: defaultState }).state;
    } else {
      defaultState = stateData;
    }
    createReducer(store.id, (state = defaultState, action) => {
      const { type } = action;
      const typePrefix = `${store.id}/`;
      if (type.indexOf(typePrefix) === 0) {
        const key = type.replace(typePrefix, '');
        if (reducers[key]) {
          return reducers[key](state, action.payload);
        }
        warning(
          false,
          `未定义actionType为 ${type} 的reducer，如果你想调用effects中的方法，请使用
          \nstore.getStore('${store.id}').dispatch({\n  type: '${key}',\n  payload,\n})`,
        );
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

  getNuomiProps() {
    const { store, location } = this.props;
    const nuomiProps = {
      store,
      location,
    };
    if (this.context) {
      nuomiProps.parent = this.context.nuomi;
    }
    return nuomiProps;
  }

  execInit() {
    const { props } = this;
    if (isFunction(props.onInit)) {
      props.onInit(this.getNuomiProps());
    }
  }

  render() {
    const { props } = this;
    const nuomiProps = this.getNuomiProps();
    const children = props.render ? props.render({ ...nuomiProps, children: props.children }) : props.children;
    return children ? <NuomiContext.Provider value={{ nuomi: nuomiProps }}>{children}</NuomiContext.Provider> : null;
  }
}
