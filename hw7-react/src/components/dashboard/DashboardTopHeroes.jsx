import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardTopHero from './DashboardTopHero';
import * as heroesActions from '../heroes/heroes.actions';
import * as heroesSelectors from '../heroes/heroes.selectors';

export class DashboardTopHeroes extends React.Component {
  static propTypes = {
    heroes: PropTypes.array.isRequired,
    updateHero: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: 'Top Heroes',
    };
  }

  render() {
    const { heroes } = this.props;
    const topHeroes = heroes.slice(0, 4);

    return (
      <div>
        <h3>{this.state.title}</h3>
        <div className="grid grid-pad">
          {topHeroes.map(hero => (
            <DashboardTopHero
              hero={hero}
              key={hero.id}
            />))}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  heroes: heroesSelectors.heroesSelector(state),
});

export const mapDispatchToProps = dispatch => ({
  updateHero: hero => dispatch(heroesActions.updateHero(hero)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardTopHeroes);
