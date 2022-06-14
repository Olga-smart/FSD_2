import '../../../styles/global.scss';
import '../../../components/footer/footer';
import '../../../components/header/header';
import '../../../components/icon-list/icon-list';
import '../../../components/card-booking/card-booking';
import '../../../components/comment/comment';
import '../../../components/bullet-list/bullet-list';
import '../../../components/diagram/diagram';
import wordToPlural from '../../../helpers/wordToPlural/wordToPlural';
import './room-details.scss';

const commentsNumber = document.querySelector('.js-room-details__comments-number');
const commentsCollection = document.querySelectorAll('.js-room-details__comment');
commentsNumber.textContent = `${commentsCollection.length} ${wordToPlural(commentsCollection.length, 'отзыв', 'отзыва', 'отзывов')}`;
