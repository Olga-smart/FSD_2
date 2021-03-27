require('slick-carousel/slick/slick.min.js');
require('slick-carousel/slick/slick.css');

import '../rate/rate.js'
import {wordToPlural} from '../word-to-plural/word-to-plural.js'

import './card-room.scss';

class RoomCard {
  
  constructor(component) {
    this._component = component;
    
    this._commentsNumber = +component.querySelector('.js-card-room__comments-number').textContent;
    this._commentsWordElement = component.querySelector('.js-card-room__comments-word');
    this._commentsWordElement.textContent = wordToPlural(this._commentsNumber, 'Отзыв', 'Отзыва', 'Отзывов');
    
    this._slider = component.querySelector('.js-card-room__slider');
    $(this._slider).slick({
      dots: true
    });
  }
  
}

let roomCards = document.querySelectorAll('.js-card-room');
for (let card of roomCards) {
  new RoomCard(card);
}

//function wordToPlural(number, wordWith1, wordWith2, wordWith5) {
//  let result = wordWith5;
//  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(last2Digits(number))) {
//    result = wordWith1;
//  }
//  if ([2, 3, 4].includes(lastDigit(number)) && ![12, 13, 14].includes(last2Digits(number))) {
//    result = wordWith2;
//  }
//  return result;
//}
//
//function lastDigit(num) {
// return +num.toString().slice(-1); 
//}
//
//function last2Digits(num) {
// return +num.toString().slice(-2); 
//}

