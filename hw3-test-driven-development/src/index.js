import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('./sass.sass');

// Check if ProvidePlugin provides us with lodash
const name = _.isEmpty({}) ? 'World' : 'Canada';    // eslint-disable-line

render(
    <App input="2+2" />,
    document.getElementById('app')
);

