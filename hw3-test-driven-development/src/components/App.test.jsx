import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import App from './App';
import * as calc from '../utils/calc';

describe('App', () => {
  beforeEach(() => {
    calc.default = jest.fn((input) => {
      switch (input) {
        case '2+2': return 4;
        case '2+6': return 8;
        case '5*5': return 25;
        case '3**2': return 9;
        case '5**2': return 25;
        case '6**2': return 36;
        case '2**6': return 64;
        case '53-11': return 42;
        case '55/5': return 11;
        case '7*8': return 56;
        default: return null;
      }
    });
  });

  // Testing initial rendering based on props
  // Using react-test-renderer directly, without enzyme
  // Comparing to stored snapshot
  it('should render correctly on startup', () => {
    const comp = renderer.create(<App input="5*5" />).toJSON();
    expect(calc.default).toHaveBeenCalledWith('5*5');
    expect(comp).toMatchSnapshot();
  });

  // Testing DOM manipulation, using enzyme
  it('should re-render correctly on equal button click', () => {
    const comp = shallow(<App input="5**2" />);

    expect(calc.default).toHaveBeenCalledTimes(1);
    expect(calc.default).toHaveBeenCalledWith('5**2');
    expect(comp.find('#result').text().trim()).toBe('25');

    comp.find('#input').simulate('change', { target: { value: '6**2' } });

    expect(calc.default).toHaveBeenCalledTimes(1);
    expect(comp.find('#result').text().trim()).toBe('25');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledTimes(2);
    expect(calc.default).toHaveBeenCalledWith('6**2');
    expect(comp.find('#result').text().trim()).toBe('36');
  });

  it('should clear the input on clear button click', () => {
    const comp = shallow(<App input="2+2" />);
    expect(calc.default).toHaveBeenCalledWith('2+2');
    expect(comp.find('#result').text().trim()).toBe('4');

    comp.find('#clear').first().simulate('click');
    expect(comp.find('#result').text().trim()).toBe('');
  });

  it('should enter digits on digit button clicks', () => {
    const comp = shallow(<App />);

    comp.find('#d1').simulate('click');
    comp.find('#d2').simulate('click');
    comp.find('#d3').simulate('click');
    comp.find('#d4').simulate('click');
    comp.find('#d5').simulate('click');
    comp.find('#d6').simulate('click');
    comp.find('#d7').simulate('click');
    comp.find('#d8').simulate('click');
    comp.find('#d9').simulate('click');
    comp.find('#d0').simulate('click');

    expect(comp.state('input')).toBe('1234567890');
  });

  it('should render addition correctly', () => {
    const comp = shallow(<App />);

    comp.find('#d2').simulate('click');
    comp.find('#add').simulate('click');
    comp.find('#d6').simulate('click');

    expect(comp.state('input')).toBe('2+6');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledWith('2+6');
    expect(comp.state('result')).toBe(8);
    expect(comp.find('#result').text().trim()).toBe('8');
  });

  it('should render substraction correctly', () => {
    const comp = shallow(<App />);

    comp.find('#d5').simulate('click');
    comp.find('#d3').simulate('click');
    comp.find('#sub').simulate('click');
    comp.find('#d1').simulate('click');
    comp.find('#d1').simulate('click');

    expect(comp.state('input')).toBe('53-11');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledWith('53-11');
    expect(comp.state('result')).toBe(42);
    expect(comp.find('#result').text().trim()).toBe('42');
  });

  it('should render division correctly', () => {
    const comp = shallow(<App />);

    comp.find('#d5').simulate('click');
    comp.find('#d5').simulate('click');
    comp.find('#div').simulate('click');
    comp.find('#d5').simulate('click');

    expect(comp.state('input')).toBe('55/5');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledWith('55/5');
    expect(comp.state('result')).toBe(11);
    expect(comp.find('#result').text().trim()).toBe('11');
  });

  it('should render multiplication correctly', () => {
    const comp = shallow(<App />);

    comp.find('#d7').simulate('click');
    comp.find('#mult').simulate('click');
    comp.find('#d8').simulate('click');

    expect(comp.state('input')).toBe('7*8');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledWith('7*8');
    expect(comp.state('result')).toBe(56);
    expect(comp.find('#result').text().trim()).toBe('56');
  });

  it('should render exponentiation correctly', () => {
    const comp = shallow(<App />);

    comp.find('#d3').simulate('click');
    comp.find('#pow').simulate('click');
    comp.find('#d2').simulate('click');

    expect(comp.state('input')).toBe('3**2');

    comp.find('#equal').simulate('click');

    expect(calc.default).toHaveBeenCalledWith('3**2');
    expect(comp.state('result')).toBe(9);
    expect(comp.find('#result').text().trim()).toBe('9');
  });

  it('should evaluate the result on submit', () => {
    const comp = mount(<App />);    // mount is a must to simulate onSubmit

    comp.find('#d2').simulate('click');
    comp.find('#pow').simulate('click');
    comp.find('#d6').simulate('click');

    expect(comp.state('input')).toBe('2**6');

    comp.find('form').first().simulate('submit');

    expect(calc.default).toHaveBeenCalledWith('2**6');
    expect(comp.state('result')).toBe(64);
    expect(comp.find('#result').text().trim()).toBe('64');
  });
});

