import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { HeroDetails, mapStateToProps, mapDispatchToProps }
  from 'components/hero-details/HeroDetails';

jest.mock('components/heroes/heroes.actions', () => ({
  updateHero: jest.fn(),
}));

jest.mock('components/heroes/heroes.selectors', () => ({
  heroReselector: (state, props) => (
    state.heroes.filter(el => el.id === props.match.params.id)[0]
  ),
}));

describe('HeroDetails', () => {
  it('should render dashboard top hero element', () => {
    const props = {
      hero: { id: 1, name: 'Primus' },
      updateHero: jest.fn(),
      history: { goBack: jest.fn() },
      match: { url: 'test_url' },
    };
    const wrapper = shallow(<HeroDetails {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should map state to props', () => {
    const state = {
      heroes: [
        { id: 4, name: 'Optimus Four' },
        { id: 5, name: 'Optimus Five' },
      ]
    };

    const props = { match: { params: { id: 4 } } };

    expect(mapStateToProps(state, props)).toEqual({
      hero: { id: 4, name: 'Optimus Four' },
    });
  });

  it('should map dispatch to props', () => {
    const dispatch = jest.fn();
    const hero = { id: 1, name: 'Primus' };
    expect(mapDispatchToProps(dispatch).updateHero(hero)).toEqual(dispatch(hero));
  });

  it('should call handleChange on input change', () => {
    const props = {
      hero: { id: 1, name: 'Primus' },
      updateHero: jest.fn(),
      history: { goBack: jest.fn() },
      match: { url: 'test_url' },
    };
    const wrapper = shallow(<HeroDetails {...props} />);
    wrapper.find('input').simulate('change', { target: { value: 'test_value' } });
    expect(props.updateHero).toBeCalled();
  });
});
