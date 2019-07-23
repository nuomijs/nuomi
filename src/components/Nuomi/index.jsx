import React, { createRef } from 'react';
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

  loadProps(cb) {
    const { async, ...rest } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      async((props) => {
        this.setState(
          {
            loaded: true,
            props: {
              ...rest,
              ...props,
            },
          },
          cb,
        );
      });
    } else {
      cb && cb();
    }
  }

  render() {
    const { loaded, props } = this.state;
    if (loaded) {
      return <BaseNuomi {...props} ref={this.ref} store={this.store} />;
    }
    return null;
  }
}

export default Nuomi;
