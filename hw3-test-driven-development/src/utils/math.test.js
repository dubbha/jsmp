import { add, sub, div, mult, pow, double, triple, square, cube, percent, negate } from './math';

describe('Math set of helpers', () => {
  describe('#add', () => {
    it('should add two operands', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(5, 0)).toBe(5);
      expect(add(2, -5)).toBe(-3);
    });
  });

  describe('#sub', () => {
    it('should substract two operands', () => {
      expect(sub(5, 1)).toBe(4);
      expect(sub(4, 0)).toBe(4);
      expect(sub(2, 4)).toBe(-2);
    });
  });

  describe('#div', () => {
    it('should divide two operands', () => {
      expect(div(9, 3)).toBe(3);
    });

    it('should handle division of zero by non-zero resulting in zero', () => {
      expect(div(0, 9)).toBe(0);
    });

    it('should handle division by zero resulting in Infinity', () => {
      expect(div(9, 0)).toBe(Infinity);
      expect(Number.isFinite(div(9, 0))).toBe(false);
    });

    it('should result in NaN when zero is divided by zero', () => {
      expect(Number.isNaN(div(0, 0))).toBe(true);
    });
  });

  describe('#mult', () => {
    it('should multiply two operands', () => {
      expect(mult(4, 5)).toBe(20);
    });
  });

  describe('#double', () => {
    it('should multiply an operand by two', () => {
      expect(double(21)).toBe(42);
    });
  });

  describe('#triple', () => {
    it('should multiply an operand by three', () => {
      expect(triple(12)).toBe(36);
    });
  });

  describe('#pow', () => {
    it('should raise one operand to the power of another operand', () => {
      expect(pow(3, 2)).toBe(9);
      expect(pow(4, 3)).toBe(64);
    });
  });

  describe('#square', () => {
    it('should raise an operand to the power two', () => {
      expect(square(3)).toBe(9);
      expect(square(4)).toBe(16);
    });
  });

  describe('#square', () => {
    it('should raise an operand to the power three', () => {
      expect(cube(3)).toBe(27);
      expect(cube(4)).toBe(64);
    });
  });

  describe('#percent', () => {
    it('should divide on operand by hundred', () => {
      expect(percent(100)).toBe(1);
      expect(percent(45)).toBe(0.45);
    });
  });

  describe('#negate', () => {
    it('should negte an operand', () => {
      expect(negate(42)).toBe(-42);
      expect(negate(-42)).toBe(42);
      expect(negate(0)).toBe(0);   
    });
  });
});
