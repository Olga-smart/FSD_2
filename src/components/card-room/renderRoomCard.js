// use this function if we render cards with JS
import filledStar from '../../../public/img/star.svg';
import emptyStar from '../../../public/img/star_border.svg';

const renderRoomCard = (item) => {
  const card = document.createElement('div');
  card.className = 'card-room js-card-room';

  const slider = document.createElement('div');
  slider.className = 'card-room__slider js-card-room__slider';
  Array.from(item.images).forEach((img) => {
    const pic = document.createElement('img');
    pic.className = 'card-room__img';
    pic.src = img;
    pic.alt = 'Фото номера';
    slider.append(pic);
  });

  const info = document.createElement('div');
  info.className = 'card-room__info';

  const infoRow1 = document.createElement('div');
  infoRow1.className = 'card-room__info-row';

  const number = document.createElement('span');
  number.className = 'card-room__number';
  number.textContent = item.number;

  if (item.lux) {
    number.classList.add('card-room__number_lux');
  }

  const price = document.createElement('span');
  price.className = 'card-room__price';
  const prettifyPrice = (num) => {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
  };
  price.textContent = `${prettifyPrice(item.price)}₽`;

  infoRow1.append(number, price);

  const hr = document.createElement('div');
  hr.className = 'card-room__line';

  const infoRow2 = document.createElement('div');
  infoRow2.className = 'card-room__info-row';

  const rate = document.createElement('div');
  rate.className = 'rate';

  const star1 = document.createElement('img');
  star1.className = 'rate__star';
  star1.src = item.rate > 0 ? filledStar : emptyStar;
  star1.alt = '';
  rate.append(star1);

  const star2 = document.createElement('img');
  star2.className = 'rate__star';
  star2.src = item.rate > 1 ? filledStar : emptyStar;
  star2.alt = '';
  rate.append(star2);

  const star3 = document.createElement('img');
  star3.className = 'rate__star';
  star3.src = item.rate > 2 ? filledStar : emptyStar;
  star3.alt = '';
  rate.append(star3);

  const star4 = document.createElement('img');
  star4.className = 'rate__star';
  star4.src = item.rate > 3 ? filledStar : emptyStar;
  star4.alt = '';
  rate.append(star4);

  const star5 = document.createElement('img');
  star5.className = 'rate__star';
  star5.src = item.rate > 4 ? filledStar : emptyStar;
  star5.alt = '';
  rate.append(star5);

  const comments = document.createElement('span');
  comments.className = 'card-room__comments js-card-room__comments';
  comments.textContent = `${item.comments} `;
  comments.dataset.word = ' Отзывов';

  infoRow2.append(rate, comments);

  info.append(infoRow1);
  info.append(hr);
  info.append(infoRow2);

  card.append(slider);
  card.append(info);

  return card;
};

export default renderRoomCard;
