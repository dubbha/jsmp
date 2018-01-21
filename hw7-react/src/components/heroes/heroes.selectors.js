import { createSelector } from 'reselect';

export const heroesSelector = state => state.heroes;

export const heroIdSelector = (state, props) => +props.match.params.id;

export const heroSelector = (state, props) => (
  state.heroes.filter(hero => hero.id === +props.match.params.id)[0]
);

export const heroReselector = createSelector(
  [heroesSelector, heroIdSelector],
  (heroes, id) => (
    heroes.filter(hero => hero.id === id)[0]
  ),
);