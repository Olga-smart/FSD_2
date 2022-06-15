import '../rate/rate';
import RoomCard from './RoomCard';
import './card-room.scss';

const cards = document.querySelectorAll('.js-card-room');
RoomCard.init(cards);
