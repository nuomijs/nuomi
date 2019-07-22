import React from 'react';
/* eslint-disable no-unused-vars */
import BaseNuomi from '../BaseNuomi';

class Nuomi extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.store = {};
    const { async, ...rest } = this.props;
    this.state = {
      loaded: typeof async !== 'function',
      props: { ...rest },
    };
  }

  componentDidMount() {
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
      return <BaseNuomi {...props} store={this.store} />;
    }
    return null;
  }
}

export default Nuomi;
