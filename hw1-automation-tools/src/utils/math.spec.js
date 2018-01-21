/* global test */
import { add, mult, double } from './math';

test('add(1, 2) should equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('mult(4, 5) should equal 20', () => {
  expect(mult(4, 5)).toBe(20);
});

test('double(21) should equal 42', () => {
  expect(double(21)).toBe(42);
});