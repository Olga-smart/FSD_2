import './comment.scss';

import '../like/like.js'
import {wordToPlural} from '../word-to-plural/word-to-plural.js'

class Comment {
  
  constructor(component) {
    this._component = component;
    this._dateElement = component.querySelector('.js-comment__date');
    this._dateToText(this._dateElement);
  }
  
  _dateToText(dateElement) {  
    let commentDate = new Date( Date.parse(this._dateElement.textContent) );
    let days = this._daysPassed(commentDate);
    if (days >= 365) {
      let years = Math.floor(days / 365);
      this._dateElement.textContent = years + ' ' + wordToPlural(years, 'год', 'года', 'лет') + ' назад';
    } else if (days >= 30) {
      let months = Math.floor(days / 30);
      this._dateElement.textContent = months + ' ' + wordToPlural(months, 'месяц', 'месяца', 'месяцев') + ' назад';
    } else if (days >= 7) {
      let weeks = Math.floor(days / 7);
      this._dateElement.textContent = weeks + ' ' + wordToPlural(weeks, 'неделю', 'недели', 'недель') + ' назад';
    } else if (days > 1) {
      this._dateElement.textContent = days + ' ' + wordToPlural(days, 'день', 'дня', 'дней') + ' назад';
    } else if (days == 1) {
      this._dateElement.textContent = 'вчера';
    } else {
      this._dateElement.textContent = 'сегодня';
    } 
  }

  _daysPassed(date) {
    let today = new Date();
    return Math.floor( (today - date) / (60 * 60 * 24 * 1000) );
  }
  
}

let comments = document.querySelectorAll('.js-comment');
for (let comment of comments) {
  new Comment(comment);
} 

