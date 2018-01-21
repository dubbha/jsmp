import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dashboard from 'components/dashboard';

describe('Dashboard', () => {
  it('should render dashboard', () => {
    const props = {
      match: {
        url: 'test_url',
      }
    };
    const wrapper = shallow(<Dashboard {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
