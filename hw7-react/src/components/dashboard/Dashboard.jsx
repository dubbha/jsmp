import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DashboardTopHeroes from './DashboardTopHeroes';
import './style.sass';

const Dashboard = ({ match }) => (
  <div className="dashboard">
    <Route exact path={match.url} component={DashboardTopHeroes} />
  </div>
);

Dashboard.propTypes = {
  match: PropTypes.any.isRequired,
};

export default Dashboard;
