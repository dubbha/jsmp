import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DashboardTopHero = ({ hero }) => (
  <Link to={`/hero-details/${hero.id}`} className="col-1-4">
    <div className="module hero">
      <h4>{hero.name}</h4>
    </div>
  </Link>
);

DashboardTopHero.propTypes = {
  hero: PropTypes.object.isRequired,
};

export default DashboardTopHero;
