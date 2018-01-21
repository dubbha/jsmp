import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as heroesActions from '../heroes/heroes.actions';
import * as heroesSelectors from '../heroes/heroes.selectors';
import './style.sass';

export class HeroDetails extends React.Component {
  static propTypes = {
    hero: PropTypes.object.isRequired,
    updateHero: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      title: 'Hero Details',
    };
  }

  handleChange = (event) => {  // https://www.ian-thomas.net/autobinding-react-and-es6-classes/
    this.props.updateHero({
      ...this.props.hero,
      name: event.target.value
    });
  }

  render() {
    const { hero, history } = this.props;
    return (
        <div className="hero-details">
            <h2>{hero.name} details!</h2>
            <div>
                <label>id: </label>{hero.id}</div>
            <div>
                <label>name: </label>
                <input
                  placeholder="name"
                  value={hero.name}
                  onChange={this.handleChange}
                />
            </div>
            <button onClick={history.goBack}>Back</button>
        </div>
    );
  }
}

export const mapStateToProps = (state, props) => ({
  hero: heroesSelectors.heroReselector(state, props),
});

export const mapDispatchToProps = dispatch => ({
  updateHero: hero => dispatch(heroesActions.updateHero(hero))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeroDetails);
