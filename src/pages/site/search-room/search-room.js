/* eslint-disable fsd/jq-use-js-prefix-in-selector */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// Because this is third party plugin

import '../../../styles/global.scss';
// This is necessary because we render cards with js
import RoomCard from '../../../components/card-room/RoomCard';
import './search-room.scss';
import roomCards from './search-room-data.json';
import './autoimport';

const filledStar = require('../../../../public/img/star.svg');
const emptyStar = require('../../../../public/img/star_border.svg');

const filtersToggle = document.querySelector('.js-search-room__filters-toggle');
const filters = document.querySelector('.js-search-room__filters');
function handleFiltersToggleClick() {
  filters.classList.toggle('search-room__filters_open');
}
filtersToggle.addEventListener('click', handleFiltersToggleClick);

// Переопределяем инициализацию Pagination, т. к. данные будем брать из JSON
$('.js-pagination').pagination({
  dataSource: roomCards,
  showNavigator: true,
  pageSize: 12,
  autoHidePrevious: true,
  autoHideNext: true,
  prevText: '',
  nextText: '',
  pageRange: 1,
  ulClassName: 'paginationjs-list',
  formatNavigator(currentPage, totalPage, totalNumber) {
    const firstNum = (currentPage - 1) * 12 + 1;
    let lastNum = firstNum + 11;
    if (lastNum > totalNumber) {
      lastNum = totalNumber;
    }
    if (totalNumber > 100) {
      totalNumber = '100+';
    }
    return `${firstNum} - ${lastNum} из ${totalNumber}  вариантов аренды`;
  },
  callback(data) {
    // eslint-disable-next-line no-use-before-define
    const html = template(data);
    $('.pagination__data-container').html(html);

    RoomCard.init($('.js-card-room'));
  },
  afterPaging() {
    $('.js-card-room__slider').slick({
      dots: true,
    });

    RoomCard.init($('.js-card-room'));
  },
});

function prettifyPrice(num) {
  const n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
}

function template(data) {
  const html = new DocumentFragment();
  $.each(data, (index, item) => {
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

    const number = document.createElement('span');
    number.className = 'card-room__number';
    number.textContent = item.number;

    if (item.lux) {
      number.classList.add('card-room__number_lux');
    }

    const price = document.createElement('span');
    price.className = 'card-room__price';
    price.textContent = `${prettifyPrice(item.price)}₽`;

    const hr = document.createElement('div');
    hr.className = 'card-room__line';

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

    info.append(number);
    info.append(price);
    info.append(hr);
    info.append(rate);
    info.append(comments);

    card.append(slider);
    card.append(info);
    html.append(card);
  });
  return html;
}
