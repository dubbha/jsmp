import valid from './valid';

describe('Valid utility', () => {
  it('should invalidate a number', () => {
    expect(valid(2)).toBe(false);
  });

  it('should invalidate an empty string', () => {
    expect(valid('')).toBe(false);
  });

  it('should invalidate a single number string', () => {
    expect(valid('2')).toBe(false);
  });

  it('should invalidate a single operand and an operator', () => {
    expect(valid('2+')).toBe(false);
    expect(valid('+2')).toBe(false);
  });

  it(`should validate two operands and an operator between them,
      without spaces`, () => {
    expect(valid('2+2')).toBe(true);
  });

  it(`should validate two operands and an operator between them,
      with spaces around an operator`, () => {
    expect(valid('2 + 2')).toBe(true);
  });

  it(`should validate two operands and an operator between them,
        with multiple spaces around an operator`, () => {
    expect(valid('2  +  2')).toBe(true);
    expect(valid('2   +   2')).toBe(true);
  });

  it(`should validate two multi-digit operands and an operator between them,
        with multiple spaces around an operator`, () => {
    expect(valid('123  +  456789')).toBe(true);
  });

  it(`should validate two multi-digit operands and an operator between them,
        with multiple spaces around an operator and both sides of the operands`, () => {
    expect(valid(' 123  +  456789 ')).toBe(true);
    expect(valid('   123456789  +  987654321   ')).toBe(true);
  });

  it('should validate a string representing a substrction', () => {
    expect(valid('2-2')).toBe(true);
    expect(valid('2 - 2')).toBe(true);
    expect(valid('  2  -  2  ')).toBe(true);
  });

  it('should validte a string representing a multiplication', () => {
    expect(valid('2*2')).toBe(true);
    expect(valid('2 * 2')).toBe(true);
    expect(valid('  2  *  2  ')).toBe(true);
  });

  it('should validate a string representing an exponentiation', () => {
    expect(valid('2**2')).toBe(true);
    expect(valid('2 ** 2')).toBe(true);
    expect(valid('  2  **  2  ')).toBe(true);
  });

  it(`should invalidate two operands with combinations of chars that represent
      no valid operation between them`, () => {
    expect(valid('2***2')).toBe(false);
    expect(valid('2+*2')).toBe(false);
    expect(valid('2*+2')).toBe(false);
    expect(valid('2+-2')).toBe(false);
    expect(valid('2*/2')).toBe(false);
  });
});
