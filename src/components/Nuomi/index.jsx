import React, { createRef } from 'react';
/* eslint-disable no-unused-vars */
import BaseNuomi from '../BaseNuomi';
import { removeReducer } from '../../core/redux/reducer';

class Nuomi extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.ref = createRef();
    this.store = {};
    const { async, ...rest } = this.props;
    this.state = {
      loaded: typeof async !== 'function',
      props: { ...rest },
    };
  }

  componentDidMount() {
    this.loadProps();
  }

  componentWillUnmount() {
    const { current } = this.ref;
    if (current && current.id) {
      removeReducer(current.id);
    }
  }

  loadProps() {
    const { async, ...rest } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      async((props) => {
        this.setState({
          loaded: true,
          props: {
            ...rest,
            ...props,
          },
        });
      });
    }
  }

  render() {
    const { loaded, props } = this.state;
    if (loaded) {
      return <BaseNuomi ref={this.ref} {...props} store={this.store} />;
    }
    return null;
  }
}

export default Nuomi;
