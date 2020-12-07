let dropdowns = document.querySelectorAll('.dropdown');
for (let dropdown of dropdowns) {
  let output = dropdown.querySelector('.dropdown__output input');
  output.addEventListener('click', function() {
    dropdown.classList.toggle('dropdown_menu_open');
    output.classList.toggle('input__input_dropdown_open');
    output.classList.toggle('input__input_focused');
  });
  
  let items = dropdown.querySelectorAll('.dropdown__item');
  for (let item of items) {
    let input = item.querySelector('.dropdown__item-input');
    let minus = item.querySelector('.dropdown__button-minus');
    let plus = item.querySelector('.dropdown__button-plus');
    minus.addEventListener('click', function() {
      if (input.value > item.dataset.minCount || input.value > 0) {
        input.value--;
      }
      
    })
    plus.addEventListener('click', function() {
      if (item.dataset.maxCount && input.value < item.dataset.maxCount) {
        input.value++;        
      } else {
        input.value++;
      }      
    })
  } 
}

$(document).ready(() => {  
  $('.iqdropdown-guests').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return 'Сколько гостей';
      }

      let guestsCount = itemCount['guests-item1'] + itemCount['guests-item2'];
      let guestsWord = wordToPlural(guestsCount, 'гость', 'гостя', 'гостей');

      let babiesCount = itemCount['guests-item3'];
      let babiesWord = wordToPlural(babiesCount, 'младенец', 'младенца', 'младенцев');

      if (babiesCount == 0) {
        return totalItems + ' ' + guestsWord;
      } else {
        return guestsCount + ' ' + guestsWord + ', ' + babiesCount + ' ' + babiesWord;
      }      
    },
    onChange: function (id, count, totalItems) {
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
      let count = menuOption.querySelector('.counter').innerHTML;
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
    if (count.innerHTML == 0 || count.innerHTML == count.closest('.iqdropdown-menu-option').dataset.mincount) {
      continue;
    } else {
      return true;
    }
    return false;
  }
}

let resetBtns = document.querySelectorAll('.dropdown__button_reset');
for (let btn of resetBtns) {
  btn.addEventListener('click', function(event) {
    event.stopPropagation();
    let counters = this.closest('.iqdropdown-menu').querySelectorAll('.counter');
    for (let counter of counters) {
      counter.val('0');
    }
    btn.disabled = true;
  });
}

let applyBtns = document.querySelectorAll('.dropdown__button_apply');
for (let btn of applyBtns) {
  btn.addEventListener('click', function() {
    this.closest('.iqdropdown').classList.remove('.menu-open');
    btn.disabled = true;
  });
}

let iqdropdownMenus = document.querySelectorAll('.iqdropdown-menu');
for (let menu of iqdropdownMenus) {
  menu.addEventListener('click', function(event) {
    if ( event.target.classList.contains('iqdropdown-menu') || event.target.classList.contains('dropdown__buttons') ) {
      event.stopPropagation();
    }    
  });
}


