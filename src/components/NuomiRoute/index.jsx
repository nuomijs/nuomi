import React from 'react';
import PropTypes from 'prop-types';
import BaseRoute from '../BaseRoute';
import Nuomi from '../Nuomi';

class NuomiRoute extends Nuomi {
  static defaultProps = {
    onBefore: null,
  };

  static propTypes = {
    onBefore: PropTypes.func,
  };

  constructor(...args) {
    super(...args);
    const { async, ...rest } = this.props;
    this.ref = React.createRef();
    this.state = {
      loaded: typeof async !== 'function',
      visible: false,
      props: { ...rest },
    };
  }

  componentDidMount() {
    this.loadProps(() => {
      const { props } = this.state;
      if (props.onBefore) {
        if (
          props.onBefore(() => {
            this.visible();
          }) === true
        ) {
          this.visible();
        }
      } else {
        this.visible();
      }
    });
  }

  visible() {
    this.setState({ visible: true });
  }

  render() {
    const { props, visible, loaded } = this.state;
    if (loaded && visible) {
      return <BaseRoute ref={this.ref} {...props} />;
    }
    return null;
  }
}

export default NuomiRoute;
