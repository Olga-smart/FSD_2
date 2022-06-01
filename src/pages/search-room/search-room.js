/* eslint-disable fsd/jq-use-js-prefix-in-selector */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
// Because this is third party plugin

import '../../styles/global.scss';
import '../../components/footer/footer';
import '../../components/header/header';
import '../../components/datepicker/datepicker';
import '../../components/dropdown/dropdown';
import '../../components/range/range';
import '../../components/checklist/checklist';
import '../../components/rich-checklist/rich-checklist';
import '../../components/expandable-checklist/expandable-checklist';
import '../../components/card-room/card-room';
import '../../components/pagination/pagination';
import './search-room.scss';
import roomCards from './search-room-data.json';

const filledStar = require('../../../public/img/star.svg');
const emptyStar = require('../../../public/img/star_border.svg');

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
  },
  afterPaging() {
    $('.js-card-room__slider').slick({
      dots: true,
    });
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
    card.className = 'card-room js-card-room.card';

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

    const numberContainer = document.createElement('div');
    numberContainer.className = 'card-room__number-container';

    const numberSign = document.createElement('span');
    numberSign.className = 'card-room__number-sign';
    numberSign.textContent = '№ ';
    numberContainer.append(numberSign);

    const number = document.createElement('span');
    number.className = 'card-room__number';
    number.textContent = item.number;
    numberContainer.append(number);

    if (item.lux) {
      const lux = document.createElement('span');
      lux.className = 'card-room__lux';
      lux.textContent = ' люкс';
      numberContainer.append(lux);
    }

    const priceContainer = document.createElement('div');
    priceContainer.className = 'card-room__price-container';

    const price = document.createElement('span');
    price.className = 'card-room__price';
    price.textContent = `${prettifyPrice(item.price)}₽`;
    priceContainer.append(price);

    const perDay = document.createElement('span');
    perDay.textContent = ' в сутки';
    priceContainer.append(perDay);

    const hr = document.createElement('div');
    hr.className = 'card-room__hr';

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

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'card-room__comments-container';

    const commentsNumber = document.createElement('span');
    commentsNumber.className = 'card-room__comments-number js-card-room__comments-number';
    commentsNumber.textContent = `${item.comments} `;
    commentsContainer.append(commentsNumber);

    const commentsWord = document.createElement('span');
    commentsWord.className = 'card-room__comments-word js-card-room__comments-word';
    commentsWord.textContent = 'Отзывов';
    commentsContainer.append(commentsWord);

    info.append(numberContainer);
    info.append(priceContainer);
    info.append(hr);
    info.append(rate);
    info.append(commentsContainer);

    card.append(slider);
    card.append(info);
    html.append(card);
  });
  return html;
}
