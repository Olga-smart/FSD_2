import '../../theme/global.scss';
import '../../components/footer/footer';
import '../../components/header/header';
import '../../components/icon-list/icon-list';
import '../../components/card-booking/card-booking';
import '../../components/comment/comment';
import '../../components/bullet-list/bullet-list';
import '../../components/diagram/diagram';
import './room-details.scss';

function lastDigit(num) {
  return +num.toString().slice(-1);
}

function last2Digits(num) {
  return +num.toString().slice(-2);
}

function wordToPlural(number, wordWith1, wordWith2, wordWith5) {
  let result = wordWith5;
  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(last2Digits(number))) {
    result = wordWith1;
  }
  if ([2, 3, 4].includes(lastDigit(number)) && ![12, 13, 14].includes(last2Digits(number))) {
    result = wordWith2;
  }
  return result;
}

const commentsNumber = document.querySelector('.js-room-details__comments-number');
const commentsCollection = document.querySelectorAll('.js-room-details__comment');
commentsNumber.textContent = `${commentsCollection.length} ${wordToPlural(commentsCollection.length, 'отзыв', 'отзыва', 'отзывов')}`;
