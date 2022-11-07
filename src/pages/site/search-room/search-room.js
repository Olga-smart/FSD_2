import '../../../styles/global.scss';

// This is necessary because we render cards with js
import Pagination from '../../../components/pagination/Pagination';
import renderRoomCard from '../../../components/card-room/renderRoomCard';
import RoomCard from '../../../components/card-room/RoomCard';

import './search-room.scss';
import roomCards from './search-room-data.json';
import './autoimport';

const filtersToggle = document.querySelector('.js-search-room__filters-toggle');
const filters = document.querySelector('.js-search-room__filters');
function handleFiltersToggleClick() {
  filters.classList.toggle('search-room__filters_open');
}
filtersToggle.addEventListener('click', handleFiltersToggleClick);

const paginationArr = roomCards;
const pagination = document.querySelector('.js-pagination');
Pagination.init(pagination, paginationArr, {
  formatItemFunction: renderRoomCard,
  callback: () => RoomCard.init($('.js-card-room')),
});
