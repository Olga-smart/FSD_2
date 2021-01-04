require('slick-carousel/slick/slick.min.js');
require('slick-carousel/slick/slick.css');

import '../card/card.js'
import '../rate/rate.js'

import './card-room.scss';

$(document).ready(function(){
  $('.js-card-room__slider').slick({
    dots: true
  });
});

let roomCards = document.querySelectorAll('.js-card-room');
for (let card of roomCards) {
  let commentsNumber = +card.querySelector('.js-card-room__comments-number').textContent;
  let commentsWord = card.querySelector('.js-card-room__comments-word');
  commentsWord.textContent = wordToPlural(commentsNumber, 'Отзыв', 'Отзыва', 'Отзывов');
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

