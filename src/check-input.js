const isErrorNumber = (n) => {
  // console.log(n);
  isErrorSpace(n);
  if (isNaN(n * 1) || n >= 100000) {
    return true;
  }
  return false;
};

const isErrorEmail = (n) => {
  // console.log(typeof n)
  for (i of n) {
    if (i === "@") {
      return false;
    }
  }
  return true;
};

const isErrorSpace = (n) => {
  if (n===null||n==null||n==""||n===""||n===undefined||n==undefined) {
    return true;
  }
  for (i in n) {
    if (i == ""|| i==" ") {
      return true;
    }
  }
  return false;
};



module.exports = { isErrorNumber, isErrorEmail,isErrorSpace };
