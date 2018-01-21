import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HeroesSelectedHero = ({ hero }) => (
  <div className="selectedHero">
    <h2 className="selectedHero__header">
      <span className="uppercase">{hero.name}</span> is my hero
    </h2>
    <Link to={`/hero-details/${hero.id}`} className="selectedHero__link">View Details</Link>
  </div>
);

HeroesSelectedHero.propTypes = {
  hero: PropTypes.object.isRequired,
};

export default HeroesSelectedHero;
