import React from 'react';
import PropTypes from 'prop-types';

export default class Navigator extends React.PureComponent {
  render() {
    const { type, children: child, ...rest } = this.props;
    const { Navigator: NavigatorWrapper, Screen } = type;

    const children = React.Children.map(child, (ele) => {
      const {
        name,
        listeners,
        options,
        component,
      } = ele.props;
      return (
        <Screen
          name={name}
          listeners={listeners}
          options={options}
          component={component || (() => ele)}
        />
      );
    });

    return (
      <NavigatorWrapper {...rest}>
        {children}
      </NavigatorWrapper>
    );
  }
}

Navigator.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
  type: PropTypes.shape({
    Navigator: PropTypes.func.isRequired,
    Screen: PropTypes.func.isRequired,
  }).isRequired,
};
