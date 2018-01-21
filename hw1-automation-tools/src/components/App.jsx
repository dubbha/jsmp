import React, { PropTypes } from 'react';
import Header from './Header';
import ts from '../typescript.ts';
import raw from '../text.txt';

const App = props => (
  <div>
    <Header>Hello, {props.name}!</Header>
    <div>Hey, {props.name}, App Here!</div>
    <div>{ts.greet()}</div>
    <div>{raw}</div>
  </div>
);

App.propTypes = {
  name: PropTypes.string.isRequired
};

export default App;