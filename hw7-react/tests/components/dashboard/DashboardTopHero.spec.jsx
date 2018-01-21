import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DashboardTopHero from 'components/dashboard/DashboardTopHero';

describe('DashboardTopHero', () => {
  it('should render dashboard top hero element', () => {
    const props = {
      hero: {
        id: 666,
        name: 'Jesus',
      }
    };
    const wrapper = shallow(<DashboardTopHero {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
