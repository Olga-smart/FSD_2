import './diagram.scss';

function lastDigit(num) {
 return +num.toString().slice(-1); 
}

function last2Digits(num) {
 return +num.toString().slice(-2); 
}

function wordToPlural(number, wordWith1, wordWith2, wordWith5) {
  let result = wordWith5;
  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(last2Digits(number))) {
    result = wordWith1;
  }
  if ([2, 3, 4].includes(lastDigit(number)) && ![12, 13, 14].includes(last2Digits(number))) {
    result = wordWith2;
  }
  return result;
}

let diagrams = document.querySelectorAll('.diagram');
for (let diagram of diagrams) {
  updateVotesWord(diagram);
}

function updateVotesWord(diagram) {
  let votesWord = diagram.querySelector('.js-diagram__votes-word');
  let votesNumber = diagram.querySelector('.js-diagram__votes-number').textContent;
  console.log(votesWord + ' ' + votesNumber);
  votesWord.textContent = wordToPlural(votesNumber, 'голос', 'голоса', 'голосов'); 
}