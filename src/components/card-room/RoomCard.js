import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.css';

import wordToPlural from '../../helpers/wordToPlural/wordToPlural';

class RoomCard {
  constructor(component) {
    this._initFields(component);
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new RoomCard(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;

    this._commentsElement = component.querySelector('.js-card-room__comments');
    this._commentsNumber = Number(this._commentsElement.textContent);
    this._commentsElement.dataset.word = wordToPlural(this._commentsNumber, ' Отзыв', ' Отзыва', ' Отзывов');

    this._slider = component.querySelector('.js-card-room__slider');
    $(this._slider).slick({
      dots: true,
    });
  }
}

export default RoomCard;
