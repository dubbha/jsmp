import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HeroesHero from 'components/heroes/HeroesHero';

describe('HeroesHero', () => {
  it('should render hero element in the heroes list', () => {
    const props = {
      hero: { id: 777, name: 'Zero' },
      setSelectedHero: jest.fn(),
      className: 'block__element_modifier',
    };
    const wrapper = shallow(<HeroesHero {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
