import React from 'react';
import BaseNuomi from '../BaseNuomi';
import { removeReducer } from '../../core/redux/reducer';
import { getDefaultProps } from '../../core/nuomi';
import { isFunction } from '../../utils';
import extend from '../../utils/extend';

class Nuomi extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.ref = React.createRef();
    this.store = {};
    const { async, ...rest } = this.props;
    const isAsync = isFunction(async);
    this.state = {
      loaded: !isAsync,
      props: isAsync ? rest : extend(getDefaultProps(), rest),
    };
  }

  componentDidMount() {
    this.loadProps();
  }

  componentWillUnmount() {
    removeReducer(this.store.id);
    if (this.ref.current) {
      this.ref.current.removeListener();
    }
  }

  loadProps() {
    const { async, ...rest } = this.props;
    const { loaded } = this.state;
    if (!loaded) {
      async((props) => {
        this.setState({
          loaded: true,
          props: extend(getDefaultProps(), extend(rest, props)),
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