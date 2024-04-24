/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let s = str.replace(/\W/g, "");
  let reversed = s.split("").reverse().join("");
  // console.log(str.toLowerCase(), reversed.toLowerCase());
  return s.toLowerCase() === reversed.toLowerCase();
}

module.exports = isPalindrome;
