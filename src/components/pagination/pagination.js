/* eslint-disable no-param-reassign */
/* eslint-disable fsd/jq-use-js-prefix-in-selector */
// Because this is third party plugin
import 'paginationjs';

import '../card-room/card-room';
import './pagination.scss';

const paginationCards = document.querySelectorAll('.js-pagination__item');
const paginationArr = [...paginationCards];

const template = (data) => {
  let html = '';
  $.each(data, (index, item) => {
    html += item.outerHTML;
  });
  return html;
};

$('.js-pagination').pagination({
  dataSource: paginationArr,
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
    const html = template(data);
    $('.pagination__data-container').html(html);
  },
  afterPaging() {
    $('.js-card-room__slider').slick({
      dots: true,
    });
  },
});
