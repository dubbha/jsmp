const unspace = (str) => {
  if (!str || typeof str !== 'string') return str;

  return str.replace(/\s/g, '');
};

export default unspace;