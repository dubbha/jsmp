import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DashboardTopHeroes, mapStateToProps, mapDispatchToProps }
  from 'components/dashboard/DashboardTopHeroes';

jest.mock('components/heroes/heroes.actions', () => ({
  updateHero: jest.fn(),
}));

jest.mock('components/heroes/heroes.selectors', () => ({
  heroesSelector: state => state.heroes,
}));

describe('DashboardTopHeroes', () => {
  let props;

  beforeEach(() => {
    props = {
      heroes: [
        { id: 1, name: 'Optimus Prime' },
        { id: 2, name: 'Optimus Duos' },
        { id: 3, name: 'Optimus Tres' },
      ],
      updateHero: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render dashboard top heroes list', () => {
    const wrapper = shallow(<DashboardTopHeroes {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const state = {
      heroes: [
        { id: 4, name: 'Optimus Four' },
        { id: 5, name: 'Optimus Five' },
      ]
    };
    expect(mapStateToProps(state)).toEqual({
      heroes: [
        { id: 4, name: 'Optimus Four' },
        { id: 5, name: 'Optimus Five' },
      ]
    });
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    const hero = { id: 1, name: 'Primus' };
    expect(mapDispatchToProps(dispatch).updateHero(hero)).toEqual(dispatch(hero));
  });
});
