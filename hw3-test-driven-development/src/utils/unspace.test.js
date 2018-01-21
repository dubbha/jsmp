import unspace from './unspace';

describe('Unspace utility', () => {
  it('should return empty string when called with an empty string', () => {
    expect(unspace('')).toBe('');
  });

  it('should return null when called with null', () => {
    expect(unspace(null)).toBe(null);
  });

  it('should return a number itself when called with a number', () => {
    expect(unspace(5)).toBe(5);
  });

  it('should remove spaces around an operator ', () => {
    expect(unspace('2 * 2')).toBe('2*2');
  });

  it('should remove spaces around an operator and both sides of the operands', () => {
    expect(unspace(' 2 * 2 ')).toBe('2*2');
  });

  it('should remove multiple spaces around an operator and both sides of the operands', () => {
    expect(unspace('  2  **  2  ')).toBe('2**2');
  });
});
