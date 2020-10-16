const checkNumber = (n) => {
  console.log(n);
  if (isNaN(n * 1) || n === null) {
    return false;
  }
  return true;
};

module.exports = { checkNumber };
