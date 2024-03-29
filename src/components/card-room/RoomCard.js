import SlickCarousel from '../../libs/slick-carousel/SlickCarousel';

import wordToPlural from '../../helpers/wordToPlural/wordToPlural';

class RoomCard {
  constructor(component) {
    this._initFields(component);
    this._initSlider();
  }

  _initFields(component) {
    this._component = component;

    this._commentsElement = component.querySelector('.js-card-room__comments');
    this._commentsNumber = Number(this._commentsElement.textContent);
    this._commentsElement.dataset.word = wordToPlural(this._commentsNumber, ' Отзыв', ' Отзыва', ' Отзывов');
  }

  _initSlider() {
    return new SlickCarousel(this._component.querySelector('.js-card-room__slider'));
  }
}

export default RoomCard;
