import React from 'react';
import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';
import RouterContext from '../RouterContext';
import { isFunction } from '../../utils';

class BaseRoute extends BaseNuomi {
  static defaultProps = {
    id: null,
    state: {},
    data: {},
    store: {},
    reducers: {},
    effects: null,
    render: null,
    onData: null,
    onInit: null,
    onChange: null,
    onLeave: null,
  };

  static propTypes = {};

  render() {
    const { props } = this;
    const children = props.render ? props.render() : props.children;
    return (
      <RouterContext.Consumer>
        {({ location: { data, reload } }) => {
          if (isFunction(data)) {

          }
          return children || null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default BaseRoute;
