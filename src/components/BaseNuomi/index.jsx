import React from 'react';
import PropTypes from 'prop-types';
import { createReducer } from '../../core/redux/reducer';
import rootStore from '../../core/redux/store';
import { isObject, isFunction } from '../../utils';
import EffectsProxy from '../../utils/EffectsProxy';

class BaseNuomi extends React.PureComponent {
  static defaultProps = {
    id: null,
    state: null,
    store: null,
    reducers: null,
    effects: null,
    render: null,
    onInit: null,
  };

  static propTypes = {};

  static childContextTypes = {
    nuomiStore: PropTypes.object,
  };

  static nuomiId = 0;

  constructor(...args) {
    super(...args);
    this.createId();
    this.createStore();
    this.createReducer();
  }

  getChildContext() {
    return {
      nuomiStore: this.store,
    };
  }

  createId() {
    BaseNuomi.nuomiId += 1;
    const { id } = this.props;
    const defaultId = `nuomi_${BaseNuomi.nuomiId}`;
    this.id = id || defaultId;
  }

  createStore() {
    const { store, effects: createEffects, reducers } = this.props;
    const effects = createEffects();
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
                    type: `${this.id}/updateLoading`,
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
                type: `${this.id}/updateLoading`,
                payload: {
                  [queue[0]]: false,
                  [queue.slice(-1)]: false,
                },
              });
            }
          }
        } else if (reducers[type]) {
          rootStore.dispatch({
            type: `${this.id}/${type}`,
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

    store.getState = () => rootStore.getState()[this.id];

    this.store = store;
  }

  createReducer() {
    const { state: defaultState, reducers } = this.props;
    createReducer(this.id, (state = defaultState, action) => {
      const { type } = action;
      const typePre = `${this.id}/`;
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
    if (props.render) {
      return props.render();
    }
    return null;
  }
}

export default BaseNuomi;
