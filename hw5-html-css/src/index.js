import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Calendar from './components/Calendar';

require('./sass/main.sass');

render(
  <Router>
    <div>
      <Route exact path="/" component={Calendar} />
    </div>
  </Router>,
  document.getElementById('app')
);

