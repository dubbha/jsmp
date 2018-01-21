import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('./style.css');
require('./sass.sass');

// Check if ProvidePlugin provides us with lodash
const name = _.isEmpty({}) ? 'World' : 'Canada';    // eslint-disable-line

render(
    <App name={name} />,
    document.getElementById('app')
);

