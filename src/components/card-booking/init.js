import '../input/init';
import '../button/button';
import '../datepicker/init';
import '../dropdown/init';
import CardBooking from './CardBooking';
import './card-booking.scss';

const cards = document.querySelectorAll('.js-card-booking');
CardBooking.init(cards);
