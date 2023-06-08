import RoomCard from './RoomCard';

const cards = document.querySelectorAll('.js-card-room');
[...cards].forEach((card) => new RoomCard(card));
