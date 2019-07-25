import React from 'react';
import PropTypes from 'prop-types';
import { createReducer } from '../../core/redux/reducer';
import rootStore from '../../core/redux/store';
import { isObject, isFunction } from '../../utils';
import EffectsProxy from '../../utils/EffectsProxy';

class BaseNuomi extends React.PureComponent {
  static defaultProps = {
    id: null,
    state: {},
    store: {},
    reducers: {},
    effects: null,
    render: null,
    onInit: null,
  };

  static propTypes = {};

  static childContextTypes = {
    sourceProps: PropTypes.object,
  };

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    const { store } = this.props;
    if (!store.id) {
      this.createId();
      this.createStore();
      this.createReducer();
    }
  }

  getChildContext() {
    return {
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
    const { store, effects: createEffects, reducers } = this.props;
    const effects = createEffects ? createEffects() || {} : {};

    store.id = this.getId();

    store.dispatch = async ({ type, payload }) => {
      if (type.indexOf('/') === -1) {
        if (isObject(effects) && isFunction(effects[type])) {
          const queue = [];
          try {
            const effectsProxy = EffectsProxy(effects, {
              get: (target, name) => {
                const effect = effects[name];
                if (isFunction(effect) && name.indexOf('$') === 0) {
                  const prevEffect = queue.slice(-1)[0];
                  rootStore.dispatch({
                    type: `${store.id}/updateLoading`,
                    payload: {
                      [prevEffect !== type ? prevEffect : undefined]: false,
                      [name]: true,
                    },
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
              rootStore.dispatch({
                type: `${store.id}/updateLoading`,
                payload: {
                  [queue[0]]: false,
                  [queue.slice(-1)]: false,
                },
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
      const typePre = `${store.id}/`;
      if (type.indexOf(typePre) === 0) {
        const key = type.replace(typePre, '');
        if (reducers[key]) {
          return reducers[key](state, action);
        }
      }
      return state;
    });
  }

  render() {
    const { props } = this;
    const children = props.render ? props.render() : props.children;
    return children || null;
  }
}

export default BaseNuomi;
