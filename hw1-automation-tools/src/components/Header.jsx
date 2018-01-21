import React, { PropTypes } from 'react';

const Header = props => (
  <h1>{props.children}</h1>
);

Header.propTypes = {
  children: PropTypes.array,
};

export default Header;