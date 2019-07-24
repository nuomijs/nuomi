import React from 'react';
import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';

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
}

export default BaseRoute;
