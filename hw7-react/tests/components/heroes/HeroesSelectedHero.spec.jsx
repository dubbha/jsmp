import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HeroesSelectedHero from 'components/heroes/HeroesSelectedHero';

describe('HeroesSelectedHero', () => {
  it('should render selected hero', () => {
    const props = {
      hero: { id: 777, name: 'Zero' }
    };
    const wrapper = shallow(<HeroesSelectedHero {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
