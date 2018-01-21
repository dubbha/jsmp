import { add, sub, div, mult, pow } from './math';
import valid from './valid';
import unspace from './unspace';

const calc = (input) => {
  if (!valid(input)) return NaN;

  const unspaced = unspace(input);

  const delim = /(\*\*|[+\-*/])/g;
  const arr = unspaced.split(delim);

  const a = Number.parseInt(arr[0], 10);
  const b = Number.parseInt(arr[2], 10);
  const operator = arr[1];

  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return sub(a, b);
    case '/':
      return div(a, b);
    case '*':
      return mult(a, b);
    case '**':
      return pow(a, b);
    default:
      return NaN;
  }
};

export default calc;
