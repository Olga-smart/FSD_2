import './comment.scss';

import '../like/like.js'

let commentDates = document.querySelectorAll('.js-comment__date');
for (let date of commentDates) {
  dateToText(date);
} 

function dateToText(date) {  
  let commentDate = new Date( Date.parse(date.textContent) );
  let days = daysPassed(commentDate);
  if (days >= 365) {
    let years = Math.floor(days / 365);
    date.textContent = years + ' ' + wordToPlural(years, 'год', 'года', 'лет') + ' назад';
  } else if (days >= 30) {
    let months = Math.floor(days / 30);
    date.textContent = months + ' ' + wordToPlural(months, 'месяц', 'месяца', 'месяцев') + ' назад';
  } else if (days >= 7) {
    let weeks = Math.floor(days / 7);
    date.textContent = weeks + ' ' + wordToPlural(weeks, 'неделю', 'недели', 'недель') + ' назад';
  } else if (days > 1) {
    date.textContent = days + ' ' + wordToPlural(days, 'день', 'дня', 'дней') + ' назад';
  } else if (days == 1) {
    date.textContent = 'вчера';
  } else {
    date.textContent = 'сегодня';
  } 
}

function daysPassed(date) {
  let today = new Date();
  return Math.floor( (today - date) / (60 * 60 * 24 * 1000) );
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

function lastDigit(num) {
 return +num.toString().slice(-1); 
}

function last2Digits(num) {
 return +num.toString().slice(-2); 
}