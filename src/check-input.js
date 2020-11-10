function isEmailError(n){
  // console.log(typeof n)
  for (i of n) {
    if (i === "@") 
      return false;
  }
  return true;
};

function isEmpty(n){
  if (n==null || n=="" || n==undefined)
    return true;
  for (i in n) {
    if (i == ""|| i==" ")
      return true;
  }
  return false;
};



module.exports = {isEmailError, isEmpty };
