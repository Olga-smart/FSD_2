let commentDates = document.querySelectorAll('.comment__date');
for (let date of commentDates) {
  dateToText(date);
} 

function dateToText(date) {
  let today = new Date();
  let commentDate = new Date( Date.parse(date.textContent) );
  if ( today.getFullYear() > commentDate.getFullYear() ) {
    let years = today.getFullYear() - commentDate.getFullYear();
    date.textContent = years + ' ' + wordToPlural(years, 'год', 'года', 'лет') + ' назад';
  } else if ( today.getMonth() > commentDate.getMonth() ) {
    let months = today.getMonth() - commentDate.getMonth();
    date.textContent = months + ' ' + wordToPlural(months, 'месяц', 'месяца', 'месяцев') + ' назад';
  } else if ( today.getDate() > commentDate.getDate() ) {
    let days = today.getDate() - commentDate.getDate();
    if (days > 6) {
      let weeks = Math.floor(days / 7);
      date.textContent = weeks + ' ' + wordToPlural(weeks, 'неделя', 'недели', 'недель') + ' назад';
    } else {
      date.textContent = days + ' ' + wordToPlural(days, 'день', 'дня', 'дней') + ' назад';
    }
  } else {
    date.textContent = 'сегодня';
  }  
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

function lastDigit(num) {
 return +num.toString().slice(-1); 
}

function last2Digits(num) {
 return +num.toString().slice(-2); 
}