export const add = (a, b) => a + b;

export const sub = (a, b) => a - b;

export const div = (a, b) => (a / b);

export const mult = (a, b) => a * b;

export const pow = (a, b) => (a ** b);

export const double = a => mult(a, 2);

export const triple = a => mult(a, 3);

export const square = a => pow(a, 2);

export const cube = a => pow(a, 3);

export const percent = a => div(a, 100);

export const negate = a => -a;