import '../input/init';
import '../calendar/init';
import '../dropdown/init';
import CardBooking from './CardBooking';

const cards = document.querySelectorAll('.js-card-booking');
[...cards].forEach((card) => new CardBooking(card));
