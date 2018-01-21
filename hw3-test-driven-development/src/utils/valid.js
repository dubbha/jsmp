const valid = (str) => {
  if (!str || typeof str !== 'string') return false;

  const reg = /^\s*\d+\s*(\*\*|[+\-*/])\s*\d+\s*$/;
  if (str.match(reg)) return true;

  return false;
};

export default valid;
