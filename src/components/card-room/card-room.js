import wordToPlural from '../../helpers/word-to-plural/word-to-plural';
import '../rate/rate';
import './card-room.scss';

require('slick-carousel/slick/slick.min');
require('slick-carousel/slick/slick.css');

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
    this._commentsNumber = Number(component.querySelector('.js-card-room__comments-number').textContent);
    this._commentsWordElement = component.querySelector('.js-card-room__comments-word');
    this._commentsWordElement.textContent = wordToPlural(this._commentsNumber, 'Отзыв', 'Отзыва', 'Отзывов');

    this._slider = component.querySelector('.js-card-room__slider');
    $(this._slider).slick({
      dots: true,
    });
  }
}

const cards = document.querySelectorAll('.js-card-room');
RoomCard.init(cards);
