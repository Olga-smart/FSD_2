require('paginationjs');

import '../card-room/card-room.js'
import './pagination.scss';

let cards = document.querySelectorAll('.js-pagination__item');
let arr = Array.from(cards);

$('.js-pagination').pagination({
  dataSource: arr,
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
  let html = '';
  $.each(data, function(index, item){
      html += item.outerHTML;
  });
  return html;  
}