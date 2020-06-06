import React from 'react';
import { RouterContext } from 'nuomi';
import PropTypes from 'prop-types';

export default class Router extends React.PureComponent {
  render() {
    const { type, ...rest } = this.props;
    const { Navigator, Screen } = type;

    return (
      <RouterContext.Provider value={Screen}>
        <Navigator {...rest} />
      </RouterContext.Provider>
    );
  }
}

Router.propTypes = {
  type: PropTypes.shape({
    Navigator: PropTypes.func.isRequired,
    Screen: PropTypes.func.isRequired,
  }).isRequired,
};
