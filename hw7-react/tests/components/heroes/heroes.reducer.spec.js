import reducer, { initialState } from 'components/heroes/heroes.reducer';
import { actionTypes } from 'components/heroes/heroes.actions';

describe('heroes.reducer', () => {
  it('should load initial state if none yet', () => {
    const action = { type: 'UNKNOWN' };
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('should return unchanged state by default', () => {
    const state = [{ id: 1, name: 'Optimus Uno' }];
    const action = { type: 'UNKNOWN' };
    expect(reducer(state, action)).toEqual(state);
  });

  it('should add a hero', () => {
    const state = [
      { id: 1, name: 'Optimus Uno' },
      { id: 2, name: 'Optimus Duos' },
      { id: 3, name: 'Optimus Tres' },
    ];
    const action = {
      type: actionTypes.HERO_ADD,
      hero: { id: 4, name: 'Optimus Cuatro' },
    };
    expect(reducer(state, action)).toEqual([
      { id: 1, name: 'Optimus Uno' },
      { id: 2, name: 'Optimus Duos' },
      { id: 3, name: 'Optimus Tres' },
      { id: 4, name: 'Optimus Cuatro' },
    ]);
  });

  it('should update a hero', () => {
    const state = [
      { id: 1, name: 'Optimus Uno' },
      { id: 2, name: 'Optimus Duos' },
      { id: 3, name: 'Optimus Tres' },
    ];
    const action = {
      type: actionTypes.HERO_UPDATE,
      hero: { id: 3, name: 'Optimus Tristan' },
    };
    expect(reducer(state, action)).toEqual([
      { id: 1, name: 'Optimus Uno' },
      { id: 2, name: 'Optimus Duos' },
      { id: 3, name: 'Optimus Tristan' },
    ]);
  });

  it('should delete a hero', () => {
    const state = [
      { id: 1, name: 'Optimus Uno' },
      { id: 2, name: 'Optimus Duos' },
      { id: 3, name: 'Optimus Tres' },
    ];
    const action = {
      type: actionTypes.HERO_DELETE,
      id: 2,
    };
    expect(reducer(state, action)).toEqual([
      { id: 1, name: 'Optimus Uno' },
      { id: 3, name: 'Optimus Tres' },
    ]);
  });

  /*
  switch (action.type) {
    case 'HERO_ADD':
      return [...state, { ...action.hero }];
    case 'HERO_UPDATE':
      return state.map(el => (el.id === action.hero.id ? { ...action.hero } : el));
    case 'HERO_DELETE':
      return state.filter(el => el.id !== action.hero.id);
    default:
      return state;
  */
});
reducer