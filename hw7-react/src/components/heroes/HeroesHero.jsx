import React from 'react';
import PropTypes from 'prop-types';

const HeroesHero = ({ hero, setSelectedHero, className }) => (
  <li onClick={setSelectedHero} className={className}>
    <span className="badge">{hero.id}</span> {hero.name}
  </li>
);

HeroesHero.propTypes = {
  hero: PropTypes.object.isRequired,
  setSelectedHero: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default HeroesHero;
