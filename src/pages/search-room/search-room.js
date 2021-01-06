import '../../theme/global.scss';

import '../../components/footer/footer.js';
import '../../components/header/header.js';
import '../../components/datepicker/datepicker.js';
import '../../components/dropdown/dropdown.js';
import '../../components/range/range.js';
import '../../components/checklist/checklist.js';
import '../../components/rich-checklist/rich-checklist.js';
import '../../components/expandable-checklist/expandable-checklist.js';
import '../../components/card-room/card-room.js';
import '../../components/pagination/pagination.js';

import './search-room.scss';
import './search-room-data.json';

let filtersToggle = document.querySelector('.js-search-room__filters-toggle');
let filters = document.querySelector('.js-search-room__filters');
filtersToggle.addEventListener('click', function() {
  filters.classList.toggle('search-room__filters_open')
})

let roomsArr = JSON.parse(roomCards);

$('.js-pagination').pagination({
  dataSource: roomsArr,
  showNavigator: true,
  pageSize: 12,
  autoHidePrevious: true,
  autoHideNext: true,
  prevText: '',
  nextText: '',
  pageRange: 1,
  ulClassName: 'paginationjs-list',
  formatNavigator: function(currentPage, totalPage, totalNumber) {
    let firstNum = (currentPage - 1) * 12 + 1;
    let lastNum = firstNum + 11;
    if (lastNum > totalNumber) {
      lastNum = totalNumber;
    }
    if (totalNumber > 100) {
      totalNumber = '100+'
    }
    return firstNum + ' - ' + lastNum + ' из ' + totalNumber + '  вариантов аренды';
  },
  callback: function(data, pagination) {
    let html = template(data);
    $('.pagination__data-container').html(html);
  },
  afterPaging: function() {
    $('.js-card-room__slider').slick({
      dots: true
    });
  }
})

function template(data) {
  let html = new DocumentFragment();
  $.each(data, function(index, item){
    let card = document.createElement('div');
    card.className = 'card-room js-card-room.card';
    
    let slider = document.createElement('div');
    slider.className = 'card-room__slider js-card-room__slider';
    for (let img of item.images) {
      let pic = document.createElement('img');
      pic.className = 'card-room__img';
      pic.src = img;
      slider.append(pic);
    }
    
    let info = document.createElement('div');
    info.className = 'card-room__info';
    
    let numberContainer = document.createElement('div');
    numberContainer.className = 'card-room__number-container';
    
    let numberSign = document.createElement('span');
    numberSign.className = 'card-room__number-sign';
    numberSign.textContent = '№ ';
    numberContainer.append(numberSign);
    
    let number = document.createElement('span');
    number.className = 'card-room__number';
    number.textContent = item.number;
    numberContainer.append(number);
    
    if (item.lux) {
      let lux = document.createElement('span');
      lux.className = 'card-room__lux';
      lux.textContent = ' люкс';
      numberContainer.append(lux);
    }
    
    let priceContainer = document.createElement('div');
    priceContainer.className = 'card-room__price-container';
    
    let price = document.createElement('span');
    price.className = 'card-room__price';
    price.textContent = prettifyPrice(item.price) + '₽';
    priceContainer.append(price);
    
    let perDay = document.createElement('span');
    perDay.textContent = ' в сутки'
    priceContainer.append(perDay);
    
    let hr = document.createElement('div');
    hr.className = 'card-room__hr';
    
    let rate = document.createElement('div');
    rate.className = 'rate';
    
    let star1 = document.createElement('img');
    star1.className = 'rate__star';
    star1.src = item.rate > 0 ? 'img/star.svg' : 'img/star_border.svg';
    rate.append(star1);
    
    let star2 = document.createElement('img');
    star2.className = 'rate__star';
    star2.src = item.rate > 1 ? 'img/star.svg' : 'img/star_border.svg';
    rate.append(star2);
    
    let star3 = document.createElement('img');
    star3.className = 'rate__star';
    star3.src = item.rate > 2 ? 'img/star.svg' : 'img/star_border.svg';
    rate.append(star3);
    
    let star4 = document.createElement('img');
    star4.className = 'rate__star';
    star4.src = item.rate > 3 ? 'img/star.svg' : 'img/star_border.svg';
    rate.append(star4);
    
    let star5 = document.createElement('img');
    star5.className = 'rate__star';
    star5.src = item.rate > 4 ? 'img/star.svg' : 'img/star_border.svg';
    rate.append(star5);
    
    let commentsContainer = document.createElement('div');
    commentsContainer.className = 'card-room__comments-container';
    
    let commentsNumber = document.createElement('span');
    commentsNumber.className = 'card-room__comments-number js-card-room__comments-number';
    commentsNumber.textContent = item.comments + ' ';
    commentsContainer.append(commentsNumber);
    
    let commentsWord = document.createElement('span');
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

function prettifyPrice(num) {
  let n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
}
  

