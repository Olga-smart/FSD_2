let dropdowns = document.querySelectorAll('.js-dropdown');
for (let dropdown of dropdowns) {
  updateDropdownOutput(dropdown);
  
  let output = dropdown.querySelector('.js-dropdown__output .js-input .js-input__input');
  output.addEventListener('click', function() {
    toggleDropdown(dropdown, output);
  });
  
  let items = dropdown.querySelectorAll('.js-dropdown__item');
  for (let item of items) {
    let input = item.querySelector('.js-dropdown__item-input');
    let minus = item.querySelector('.js-dropdown__button-minus');
    let plus = item.querySelector('.js-dropdown__button-plus');
    minus.addEventListener('click', function() {
      if ( counterCanBeDecreased(item, input) ) {
        input.value--;
        if ( counterValueIsMinimal(item, input) ) {
          minus.disabled = true;
        }
      }
      updateDropdownOutput(dropdown);
      apply.style.display = 'inline-block';
      if ( buttonResetIsNecessary(dropdown) ) {
        reset.style.display = 'inline-block';
      }
    })
    plus.addEventListener('click', function() {
      if ( counterCanBeIncreased(item, input) ) {
        input.value++;
        if ( counterValueIsMaximal(item, input) ) {
          plus.disabled = true;
        }
      }
      updateDropdownOutput(dropdown);
      apply.style.display = 'inline-block';
      reset.style.display = 'inline-block';
    })
    if ( counterValueIsMinimal(item, input) ) {
      minus.disabled = true;
    }
    if ( counterValueIsMaximal(item, input) ) {
      plus.disabled = true;
    }
  }
  
  let reset = dropdown.querySelector('.js-dropdown__button-reset');
  if ( buttonResetIsNecessary(dropdown) ) {
    reset.style.display = 'inline-block';
  }
  reset.addEventListener('click', function() {
    resetDropdown(dropdown);
    reset.style.display = 'none';
  })
  
  let apply = dropdown.querySelector('.js-dropdown__button-apply');
  apply.addEventListener('click', function() {
    toggleDropdown(dropdown, output);
    apply.style.display = 'none';
  })

}

function toggleDropdown(dropdown, output) {
  dropdown.classList.toggle('dropdown_menu_open');
  output.classList.toggle('input__input_dropdown_open');
  output.classList.toggle('input__input_focused');
} 

function counterCanBeDecreased(item, input) {
  if (item.dataset.minCount) {
    return input.value > item.dataset.minCount;
  } else {
    return input.value > 0;
  }  
}

function counterCanBeIncreased(item, input) {
  if (item.dataset.maxCount) {
    return input.value < item.dataset.maxCount;
  }
  return true;
}

function updateDropdownOutput(dropdown) {
  let output = dropdown.querySelector('.js-dropdown__output .js-input .js-input__input');
  let inputs = dropdown.querySelectorAll('.js-dropdown__item-input');
  
  if (dropdown.dataset.type == 'guests') {
    if ( sumDropdownValues(dropdown) == 0 ) {
      output.value = 'Сколько гостей';
    } else {
      let guestsCount = +inputs[0].value + +inputs[1].value;
      let guestsWord = wordToPlural(guestsCount, 'гость', 'гостя', 'гостей');

      let babiesCount = +inputs[2].value;
      let babiesWord = wordToPlural(babiesCount, 'младенец', 'младенца', 'младенцев');

      if (babiesCount == 0) {
        output.value = guestsCount + ' ' + guestsWord;
      } else {
        output.value = guestsCount + ' ' + guestsWord + ', ' + babiesCount + ' ' + babiesWord;
      }
    }
  }
   
  if (dropdown.dataset.type == 'facilities') {
    if ( sumDropdownValues(dropdown) == 0 ) {
      output.value = 'Выберите удобства';
    } else {
      let result = '';
      
      let bedroomsCount = +inputs[0].value;
      if (bedroomsCount > 0) {
        let bedroomsWord = wordToPlural(bedroomsCount, 'спальня', 'спальни', 'спален');
        result += bedroomsCount + ' ' + bedroomsWord;
      }

      let bedsCount = +inputs[1].value;
      if (bedsCount > 0) {
        let bedsWord = wordToPlural(bedsCount, 'кровать', 'кровати', 'кроватей');
        if (result.length > 0) {
          result += ', ';
        }
        result += bedsCount + ' ' + bedsWord;
      }

      let bathroomsCount = +inputs[2].value;
      if (bathroomsCount > 0) {
        let bathroomsWord = wordToPlural(bathroomsCount, 'ванная', 'ванные', 'ванных');
        if (result.length > 0) {
          result += ', ';
        } 
        result += bathroomsCount + ' ' + bathroomsWord;
      }

      output.value = result;
    }
  }
     
}

function sumDropdownValues(dropdown) {
  let sum = 0;
  let counters = dropdown.querySelectorAll('.js-dropdown__item-input');
  for (let counter of counters) {
    sum += +counter.value;
  }
  return sum;
}

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

function buttonResetIsNecessary(dropdown) {
  let inputs = dropdown.querySelectorAll('.js-dropdown__item-input');
  for (let input of inputs) {   
    if (input.value == 0 || input.value == input.closest('.js-dropdown__item').dataset.minCount) {
      continue;
    } else {
      return true;
    }
    return false;
  }
}

function buttonApplyIsNecessary(dropdown) {
  return true;
}

function resetDropdown(dropdown) {
  let inputs = dropdown.querySelectorAll('.js-dropdown__item-input');
  for (let input of inputs) {
    input.value = input.closest('.js-dropdown__item').dataset.defaultCount || 0;
  }
}

function counterValueIsMinimal(item, input) {
  return input.value == item.dataset.minCount || input.value == 0;
}

function counterValueIsMaximal(item, input) {
  return input.value == item.dataset.maxCount;
}


