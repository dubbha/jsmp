import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink } from 'react-router-dom';
import Dashboard from '../dashboard';
import Heroes from '../heroes';
import HeroDetails from '../hero-details';
import './style.sass';
import '../../assets/react.svg';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'React Heroes'
    };
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__header">
          <img src="/react.svg" alt="" className="app__logo" />
          {this.state.title}
        </h1>
        <nav>
          <NavLink to="/dashboard" className="app__navLink" activeClassName="active">Dashboard</NavLink>
          <NavLink to="/heroes" className="app__navLink" activeClassName="active">Heroes</NavLink>
        </nav>

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/heroes" component={Heroes} />
        <Route path="/hero-details/:id" component={HeroDetails} />

      </div>
    );
  }
}

export default App;