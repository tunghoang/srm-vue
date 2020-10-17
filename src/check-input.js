const checkErrorNumber = (n) => {
  console.log(n);
  checkSpace(n);
  if (isNaN(n * 1) || n >= 100000) {
    return true;
  }
  return false;
};

const checkErrorEmail = (n) => {
  // console.log(typeof n)
  checkSpace(n);
  for (i of n) {
    if (i === "@") {
      return false;
    }
  }
  return true;
};

const checkSpace = (n) => {
  for (i in n) {
    if (i == " "|| i==null) {
      return true;
    }
  }
};

module.exports = { checkErrorNumber, checkErrorEmail };
