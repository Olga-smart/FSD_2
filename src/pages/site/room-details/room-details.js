import '../../../styles/global.scss';
import wordToPlural from '../../../helpers/wordToPlural/wordToPlural';
import './room-details.scss';
import './autoimport';

const commentsNumber = document.querySelector('.js-room-details__comments-number');
const commentsCollection = document.querySelectorAll('.js-room-details__comment');
commentsNumber.textContent = `${commentsCollection.length} ${wordToPlural(commentsCollection.length, 'отзыв', 'отзыва', 'отзывов')}`;
