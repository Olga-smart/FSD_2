import Pagination from './Pagination';

const paginationCards = document.querySelectorAll('.js-pagination__item');
const paginationArr = [...paginationCards];
const pagination = document.querySelector('.js-pagination');

Pagination.init(pagination, paginationArr);
