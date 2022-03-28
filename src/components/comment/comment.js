import wordToPlural from '../../helpers/wordToPlural/wordToPlural';
import '../like/like';
import './comment.scss';

class Comment {
  constructor(component) {
    this._initFields(component);
    this._convertDateToText(this._dateElement);
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new Comment(element));
    });

    return arr;
  }

  static _getDaysPassed(date) {
    const today = new Date();
    return Math.floor((today - date) / (60 * 60 * 24 * 1000));
  }

  _initFields(component) {
    this._component = component;
    this._dateElement = component.querySelector('.js-comment__date');
  }

  _convertDateToText() {
    const commentDate = new Date(Date.parse(this._dateElement.textContent));
    const days = Comment._getDaysPassed(commentDate);
    if (days >= 365) {
      const years = Math.floor(days / 365);
      this._dateElement.textContent = `${years} ${wordToPlural(years, 'год', 'года', 'лет')} назад`;
    } else if (days >= 30) {
      const months = Math.floor(days / 30);
      this._dateElement.textContent = `${months} ${wordToPlural(months, 'месяц', 'месяца', 'месяцев')} назад`;
    } else if (days >= 7) {
      const weeks = Math.floor(days / 7);
      this._dateElement.textContent = `${weeks} ${wordToPlural(weeks, 'неделю', 'недели', 'недель')} назад`;
    } else if (days > 1) {
      this._dateElement.textContent = `${days} ${wordToPlural(days, 'день', 'дня', 'дней')} назад`;
    } else if (days === 1) {
      this._dateElement.textContent = 'вчера';
    } else {
      this._dateElement.textContent = 'сегодня';
    }
  }
}

const comments = document.querySelectorAll('.js-comment');
Comment.init(comments);
