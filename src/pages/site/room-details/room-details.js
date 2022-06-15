import '../../../styles/global.scss';
import '../../../components/footer/footer';
import '../../../components/header/init';
import '../../../components/icon-list/icon-list';
import '../../../components/card-booking/init';
import '../../../components/comment/init';
import '../../../components/bullet-list/bullet-list';
import '../../../components/diagram/init';
import wordToPlural from '../../../helpers/wordToPlural/wordToPlural';
import './room-details.scss';

const commentsNumber = document.querySelector('.js-room-details__comments-number');
const commentsCollection = document.querySelectorAll('.js-room-details__comment');
commentsNumber.textContent = `${commentsCollection.length} ${wordToPlural(commentsCollection.length, 'отзыв', 'отзыва', 'отзывов')}`;
