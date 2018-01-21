import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Cabinet from './components/Cabinet';

require('./style.sass');

injectTapEventPlugin();   // required by Material-UI

render(
  <Router>
    <div>
      <Route exact path="/" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cabinet" component={Cabinet} />
    </div>
  </Router>,
  document.getElementById('app')
);
