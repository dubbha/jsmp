import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Dashboard from './components/Dashboard';

require('./style.sass');
require('./assets/json/kyiv-temp-mavg.json');
require('./assets/json/san-diego-temp-mavg.json');

injectTapEventPlugin();   // required by Material-UI

render(
  <Router>
    <MuiThemeProvider>
      <div>
        <Route exact path="/" component={Dashboard} />
      </div>
    </MuiThemeProvider>
  </Router>,
  document.getElementById('app')
);
