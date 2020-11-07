import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.js');
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.css');

$(document).ready(() => {
  $('.iqdropdown-guests').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return 'Сколько гостей';
      }
      
      let guestsWord = wordToPlural(totalItems, 'гость', 'гостя', 'гостей');
      
      let babiesCount = itemCount['guests-item3'];
      let babiesWord = wordToPlural(babiesCount, 'младенец', 'младенца', 'младенцев');
      
      if (babiesCount == 0) {
        return totalItems + ' ' + guestsWord;
      }
      return totalItems + ' ' + guestsWord + ', ' + babiesCount + ' ' + babiesWord;
    },
    onChange: (id, count, totalItems) => {
      toggleDisabledMinusBtn(id, count);
      let dropdown = document.querySelector('.iqdropdown-guests');
      showResetAndApplyBtns(dropdown);
      let resetBtn = dropdown.querySelector('.dropdown__button_reset');
      if ( isResetBtnNeed(dropdown) ) {
        resetBtn.disabled = false;
      } else {
        resetBtn.disabled = true;
      }
    }
  });
  
  $('.iqdropdown-facilities').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return '';
      }
      
      let result = '';
      
      let bedroomsCount = itemCount['facilities-item1'];
      if (bedroomsCount > 0) {
        let bedroomsWord = wordToPlural(bedroomsCount, 'спальня', 'спальни', 'спален');
        result += bedroomsCount + ' ' + bedroomsWord;
      }
      
      let bedsCount = itemCount['facilities-item2'];
      if (bedsCount > 0) {
        let bedsWord = wordToPlural(bedsCount, 'кровать', 'кровати', 'кроватей');
        if (result.length > 0) {
          result += ', ';
        }
        result += bedsCount + ' ' + bedsWord;
      }
      
      let bathroomsCount = itemCount['facilities-item3'];
      if (bathroomsCount > 0) {
        let bathroomsWord = wordToPlural(bathroomsCount, 'ванная', 'ванные', 'ванных');
        if (result.length > 0) {
          result += ', ';
        } 
        result += bathroomsCount + ' ' + bathroomsWord;
      }
      
      return result;
    },
    onChange: (id, count, totalItems) => {
      toggleDisabledMinusBtn(id, count);
      let dropdown = document.querySelector('.iqdropdown-facilities');
      showResetAndApplyBtns(dropdown);
      let resetBtn = dropdown.querySelector('.dropdown__button_reset');
      if ( isResetBtnNeed(dropdown) ) {
        resetBtn.disabled = false;
      } else {
        resetBtn.disabled = true;
      }      
    }
  });
  
  disableMinusBtns();
});

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

function toggleDisabledMinusBtn(id, count) {
  let thisMenuOption = document.querySelector(`.iqdropdown-menu-option[data-id=${id}]`);
  let btnDecrement = thisMenuOption.querySelector('.button-decrement');
  if (count == 0 || count == thisMenuOption.dataset.mincount) {    
    btnDecrement.disabled = true; 
  } else {
    btnDecrement.disabled = false; 
  }
}

function disableMinusBtns() {
  let iqdropdowns = document.querySelectorAll('.iqdropdown');
  for (let iqdropdown of iqdropdowns) {
    let menuOptions = iqdropdown.querySelectorAll(`.iqdropdown-menu-option`);
    for (let menuOption of menuOptions) {
      let id = menuOption.dataset.id;
      let count = menuOption.querySelector('.counter').textContent;
      toggleDisabledMinusBtn(id, count);
    }
  }
}

function showResetAndApplyBtns(dropdown) {
  dropdown.querySelector('.dropdown__buttons').classList.remove('hidden');
  dropdown.querySelector('.dropdown__button_apply').disabled = false;
}

function isResetBtnNeed(dropdown) {
  let counts = dropdown.querySelectorAll('.counter');
  for (let count of counts) {   
    if (count.textContent == 0 || count.textContent == count.closest('.iqdropdown-menu-option').dataset.mincount) {
      continue;
    } else {
      return true;
    }
    return false;
  }
}

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
    btn.disabled = true;
  })
}
