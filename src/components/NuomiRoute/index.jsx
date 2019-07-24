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

  static wrappers = [];

  constructor(...args) {
    super(...args);
    const { async, ...rest } = this.props;
    this.ref = React.createRef();
    this.wrapperRef = React.createRef();
    this.state = {
      loaded: typeof async !== 'function',
      visible: false,
      props: { ...rest },
    };
  }

  componentDidMount() {
    const { current } = this.wrapperRef;
    if (current) {
      NuomiRoute.wrappers.push(current);
    }
    this.visibleWrapperHandler();
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

  componentWillUnmount() {
    super.componentWillUnmount();
    const { current } = this.wrapperRef;
    if (current) {
      NuomiRoute.wrappers = NuomiRoute.wrappers.filter((wrapper) => wrapper !== current);
    }
  }

  visible() {
    this.setState({ visible: true });
  }

  visibleWrapperHandler() {
    const { current } = this.wrapperRef;
    NuomiRoute.wrappers.forEach((wrapper) => {
      const elem = wrapper;
      elem.style.display = current === elem ? 'block' : 'none';
    });
  }

  render() {
    const { props, visible, loaded } = this.state;
    const { wrapper } = this.props;
    const routeComponent = <BaseRoute ref={this.ref} {...props} />;
    if (wrapper) {
      return (
        <div ref={this.wrapperRef} className="nuomi-route-wrapper">
          {loaded && visible && routeComponent}
        </div>
      );
    }
    if (loaded && visible) {
      return routeComponent;
    }
    return null;
  }
}

export default NuomiRoute;
