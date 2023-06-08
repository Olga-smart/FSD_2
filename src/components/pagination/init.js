import Pagination from './Pagination';

const paginationElements = document.querySelectorAll('.js-pagination');

paginationElements.forEach((pagination) => {
  const itemsContainer = document.getElementById(pagination.dataset.itemsContainer);
  const itemsCollection = itemsContainer.querySelectorAll('.js-pagination__item');
  const itemsArray = [...itemsCollection];
  return new Pagination(pagination, itemsArray);
});
