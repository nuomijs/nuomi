import React from 'react';
import PropTypes from 'prop-types';
import BaseNuomi from '../BaseNuomi';

class BaseRoute extends BaseNuomi {
  static defaultProps = {
    id: null,
    state: null,
    data: null,
    store: null,
    reducers: null,
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
