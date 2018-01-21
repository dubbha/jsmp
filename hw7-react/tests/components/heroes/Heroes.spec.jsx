import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Heroes, mapStateToProps } from 'components/heroes/Heroes';

jest.mock('components/heroes/heroes.selectors', () => ({
  heroesSelector: state => state.heroes,
}));

describe('Heroes', () => {
  it('should render heroes list', () => {
    const props = {
      heroes: [
        { id: 3, name: 'Optimus Drie' },
        { id: 4, name: 'Optimus Fier' },
        { id: 5, name: 'Optimus Funf' },
      ],
    };
    const wrapper = shallow(<Heroes {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const state = {
      heroes: [
        { id: 3, name: 'Optimus Drie' },
        { id: 4, name: 'Optimus Fier' },
        { id: 5, name: 'Optimus Funf' },
      ]
    };

    const props = { heroes: [] };

    expect(mapStateToProps(state, props)).toEqual({
      heroes: [
        { id: 3, name: 'Optimus Drie' },
        { id: 4, name: 'Optimus Fier' },
        { id: 5, name: 'Optimus Funf' },
      ]
    });
  });

  it('should select a hero on a child click', () => {
    const props = {
      heroes: [
        { id: 3, name: 'Optimus Drie' },
        { id: 4, name: 'Optimus Fier' },
        { id: 5, name: 'Optimus Funf' },
      ],
    };
    const wrapper = shallow(<Heroes {...props} />);
    wrapper.find('HeroesHero').at(1).prop('setSelectedHero')();
    expect(wrapper.find('HeroesHero').at(1).hasClass('selected')).toEqual(true);
  });
});
