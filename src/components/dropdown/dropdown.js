import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.js');
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.css');

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

$(document).ready(() => {
  $('.iqdropdown-guests').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return 'Сколько гостей';
      }
      
      let guestsWord = wordToPlural(totalItems, 'гость', 'гостя', 'гостей');
      
      let babiesCount = itemCount['item3'];
      let babiesWord = wordToPlural(babiesCount, 'младенец', 'младенца', 'младенцев');
      
      if (babiesCount == 0) {
        return totalItems + ' ' + guestsWord;
      }
      return totalItems + ' ' + guestsWord + ', ' + babiesCount + ' ' + babiesWord;
    },
//    onChange: (id, count, totalItems) => {
//      if (count == 0) {
//        let thisMenuOption = document.querySelector(`.iqdropdown-menu-option[data-id=${id}]`);
//        let btnDecrement = thisMenuOption.querySelector('.button-decrement').background = "red"; 
//      }
//    }
  });
  $('.iqdropdown-facilities').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return '';
      }
      
      let result = '';
      
      let bedroomsCount = itemCount['item1'];
      if (bedroomsCount > 0) {
        let bedroomsWord = wordToPlural(bedroomsCount, 'спальня', 'спальни', 'спален');
        result += bedroomsCount + ' ' + bedroomsWord;
      }
      
      let bedsCount = itemCount['item2'];
      if (bedsCount > 0) {
        let bedsWord = wordToPlural(bedsCount, 'кровать', 'кровати', 'кроватей');
        if (result.length > 0) {
          result += ', ';
        }
        result += bedsCount + ' ' + bedsWord;
      }
      
      let bathroomsCount = itemCount['item3'];
      if (bathroomsCount > 0) {
        let bathroomsWord = wordToPlural(bathroomsCount, 'ванная', 'ванные', 'ванных');
        if (result.length > 0) {
          result += ', ';
        } 
        result += bathroomsCount + ' ' + bathroomsWord;
      }
      
      return result;
    }
  });
});

let resetBtns = document.querySelectorAll('.dropdown__button_reset');
for (let btn of resetBtns) {
  btn.addEventListener('click', function() {
    let counters = this.closest('.iqdropdown-menu').querySelectorAll('.counter');
    for (let counter of counters) {
      counter.textContent = '0';
    }
  })
}

let applyBtns = document.querySelectorAll('.dropdown__button_apply');
for (let btn of applyBtns) {
  btn.addEventListener('click', function() {
    this.closest('.iqdropdown').classList.remove('.menu-open');
  })
}
