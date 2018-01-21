import calc from './calc';

describe('Calc utility', () => {
  it('should return NaN if called with null', () => {
    expect(Number.isNaN(calc(null))).toBe(true);
  });

  it('should return NaN if called with empty string', () => {
    expect(Number.isNaN(calc(''))).toBe(true);
  });

  it('should return NaN if called with false', () => {
    expect(Number.isNaN(calc(false))).toBe(true);
  });

  it(`should calculate the result when called with two operands
      and an operator between them, without spaces`, () => {
    expect(calc('2+2')).toBe(4);
  });

  it(`should calculate the result when called with two operands and an operator between them,
      with a space between one of the operators and an operand`, () => {
    expect(calc('2 +2')).toBe(4);
    expect(calc('2+ 2')).toBe(4);
  });

  it(`should calculate the result when called with two operands and an operator between them,
      with single spaces around an operand`, () => {
    expect(calc('2 + 2')).toBe(4);
  });

  it(`should calculate the result when called with two operands and an operator between them,
      with multiple spaces around an operator and on both sides of the operands`, () => {
    expect(calc('  2  +  2  ')).toBe(4);
  });

  it('should perform addition correctly', () => {
    expect(calc('4+3')).toBe(7);
    expect(calc('12+34')).toBe(46);
    expect(calc('123+345')).toBe(468);
  });

  it('should perform substraction correctly', () => {
    expect(calc('12-3')).toBe(9);
    expect(calc('123-81')).toBe(42);
  });

  it('should perform substraction crossing the zero boundary correctly', () => {
    expect(calc('2-4')).toBe(-2);
    expect(calc('42-84')).toBe(-42);
  });

  it('should perform substraction resulting in zero correctly', () => {
    expect(calc('2-2')).toBe(0);
    expect(calc('42-42')).toBe(0);
  });

  it('should perform division correctly', () => {
    expect(calc('84/2')).toBe(42);
    expect(calc('2/4')).toBe(0.5);
  });

  it('should perform multiplication correctly', () => {
    expect(calc('4*2')).toBe(8);
  });

  it('should perform exponentiation correctly', () => {
    expect(calc('4**2')).toBe(16);
    expect(calc('4**0')).toBe(1);
  });
});
