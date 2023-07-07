const wordToPlural = (number, wordWith1, wordWith2, wordWith5) => {
  const lastDigit = (num) => +num.toString().slice(-1);
  const last2Digits = (num) => +num.toString().slice(-2);

  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(last2Digits(number))) {
    return wordWith1;
  }

  if ([2, 3, 4].includes(lastDigit(number)) && ![12, 13, 14].includes(last2Digits(number))) {
    return wordWith2;
  }

  return wordWith5;
};

export default wordToPlural;
