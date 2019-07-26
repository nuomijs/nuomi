import React from 'react';
import PropTypes from 'prop-types';
import { createReducer } from '../../core/redux/reducer';
import rootStore from '../../core/redux/store';
import { isObject, isFunction } from '../../utils';
import EffectsProxy from '../../utils/effectsProxy';

class BaseNuomi extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    state: PropTypes.object,
    data: PropTypes.object,
    store: PropTypes.object,
    reducers: PropTypes.object,
    effects: PropTypes.func,
    render: PropTypes.func,
    onInit: PropTypes.func,
  };

  static childContextTypes = {
    nuomiStore: PropTypes.object,
    sourceProps: PropTypes.object,
  };

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    const { props } = this;
    if (!props.store.id) {
      this.createStore();
      this.createReducer();
    }
  }

  getChildContext() {
    const { store } = this.props;
    return {
      nuomiStore: store,
      sourceProps: this.props,
    };
  }

  getId() {
    BaseNuomi.nuomiId += 1;
    const { id } = this.props;
    const defaultId = `nuomi_${BaseNuomi.nuomiId}`;
    return id || defaultId;
  }

  createStore() {
    const { props } = this;
    const { store, reducers } = props;

    store.id = this.getId();

    store.dispatch = async ({ type, payload }) => {
      if (!this.effects) {
        this.effects = props.effects ? props.effects() : null;
      }
      if (type.indexOf('/') === -1) {
        if (isObject(this.effects) && isFunction(this.effects[type])) {
          const queue = [];
          try {
            const effectsProxy = EffectsProxy(this.effects, {
              get: (target, name) => {
                const effect = this.effects[name];
                if (isFunction(effect) && name.indexOf('$') === 0) {
                  const prevEffect = queue.slice(-1)[0];
                  const loadingPayload = { [name]: true };
                  if (prevEffect !== type && prevEffect) {
                    loadingPayload[prevEffect] = false;
                  }
                  rootStore.dispatch({
                    type: `${store.id}/updateLoading`,
                    payload: loadingPayload,
                  });
                  queue.push(name);
                }
                return effect;
              },
            });
            return await effectsProxy[type](payload);
          } catch (e) {
            if (e instanceof Error) {
              throw e;
            }
          } finally {
            if (queue.length) {
              const loadingPayload = { [queue[0]]: false };
              const lastEffect = queue.slice(-1)[0];
              if (lastEffect) {
                loadingPayload[lastEffect] = false;
              }
              rootStore.dispatch({
                type: `${store.id}/updateLoading`,
                payload: loadingPayload,
              });
            }
          }
        } else if (reducers[type]) {
          rootStore.dispatch({
            type: `${store.id}/${type}`,
            payload,
          });
        }
      } else {
        rootStore.dispatch({
          type,
          payload,
        });
      }
    };

    store.getState = () => rootStore.getState()[store.id];
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

    this.initialize();
  }

  initialize() {
    const { props } = this;
    if (props.onInit) {
      props.onInit();
    }
  }

  render() {
    const { props } = this;
    const children = props.render ? props.render() : props.children;
    return children || null;
  }
}

export default BaseNuomi;
