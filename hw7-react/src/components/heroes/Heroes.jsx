import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeroesHero from './HeroesHero';
import HeroesSelectedHero from './HeroesSelectedHero';
import * as heroesSelectors from './heroes.selectors';
import './style.sass';

export class Heroes extends React.Component {
  static propTypes = {
    heroes: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      title: 'Heroes',
      selectedHero: null,
    };
  }

  setSelectedHero = (hero) => {
    this.setState({
      selectedHero: hero
    });
  }

  render() {
    const { heroes } = this.props;
    const { selectedHero } = this.state;
    return (
      <div className="heroes">
        <h2>My Heroes</h2>
        <ul className="heroes">
          {heroes.map(hero => (
              <HeroesHero
                hero={hero}
                key={hero.id}
                setSelectedHero={() => this.setSelectedHero(hero)}
                className={(this.state.selectedHero && this.state.selectedHero.id === hero.id)
                              ? 'selected' : '' }
              />))}
        </ul>
        { selectedHero ? (<HeroesSelectedHero hero={selectedHero} />) : '' }
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  heroes: heroesSelectors.heroesSelector(state),
});

export default connect(
  mapStateToProps,
)(Heroes);
