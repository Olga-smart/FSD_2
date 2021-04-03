import './dropdown.scss';

import '../button/button.js'
import {wordToPlural} from '../word-to-plural/word-to-plural.js'

class Dropdown {
  
  constructor(component) {
    
    this._component = component;
    this._type = component.dataset.type;
    this._outputElement = component.querySelector('.js-dropdown__output .js-input .js-input__input');
    
    this._items = component.querySelectorAll('.js-dropdown__item');
    for (let item of this._items) {
      item._input = item.querySelector('.js-dropdown__item-input');
      item._minus = item.querySelector('.js-dropdown__button-minus');
      item._plus = item.querySelector('.js-dropdown__button-plus');
      
      if ( this._counterValueIsMinimal(item) ) {
        item._minus.disabled = true;
      }
      if ( this._counterValueIsMaximal(item) ) {
        item._plus.disabled = true;
      }
    }
    
    this._applyButton = component.querySelector('.js-dropdown__button-apply');
    this._resetButton = component.querySelector('.js-dropdown__button-reset');
    
    if (this._type == 'guests') {
      this._zeroValue = 'Сколько гостей';
    }
    
    if (this._type == 'facilities') {
      this._zeroValue = 'Выберите удобства';
    }
    
    this._setPropertiesForThisType();
        
    this._updateDropdownOutput();
    
    if ( this._buttonResetIsNecessary() ) {
      this._resetButton.style.display = 'inline-block';
    }
    
    this._attachEventHandlers();
  
  }
  
  _setPropertiesForThisType() {
    if (this._type == 'guests') {
      this._setGuestsProperties();
    }
    
    if (this._type == 'facilities') {
      this._setFacilitiesProperties();
    }    
  }
  
  _setGuestsProperties() {
    this._guestsCount = +this._items[0]._input.value + +this._items[1]._input.value;
    this._guestsWord = wordToPlural(this._guestsCount, 'гость', 'гостя', 'гостей');

    this._babiesCount = +this._items[2]._input.value;
    this._babiesWord = wordToPlural(this._babiesCount, 'младенец', 'младенца', 'младенцев');
  }
  
  _setFacilitiesProperties() {
    this._bedroomsCount = +this._items[0]._input.value;
    this._bedroomsWord = wordToPlural(this._bedroomsCount, 'спальня', 'спальни', 'спален');

    this._bedsCount = +this._items[1]._input.value;
    this._bedsWord = wordToPlural(this._bedsCount, 'кровать', 'кровати', 'кроватей');

    this._bathroomsCount = +this._items[2]._input.value;
    this._bathroomsWord = wordToPlural(this._bathroomsCount, 'ванная', 'ванные', 'ванных');
  }
  
  _updateDropdownOutput() {
    if ( this._sumDropdownValues() == 0 ) {
      this._outputElement.value = this._zeroValue;
    } else {
      if (this._type == 'guests') {
        if (this._babiesCount == 0) {
          this._outputElement.value = this._guestsCount + ' ' + this._guestsWord;
        } else {
          this._outputElement.value = this._guestsCount + ' ' + this._guestsWord + ', ' + this._babiesCount + ' ' + this._babiesWord;
        }
      }
      
      if (this._type == 'facilities') {
        let result = '';
      
        if (this._bedroomsCount > 0) {
          result += this._bedroomsCount + ' ' + this._bedroomsWord;
        }

        if (this._bedsCount > 0) {
          if (result.length > 0) {
            result += ', ';
          }
          result += this._bedsCount + ' ' + this._bedsWord;
        }

        if (this._bathroomsCount > 0) {
          if (result.length > 0) {
            result += ', ';
          } 
          result += this._bathroomsCount + ' ' + this._bathroomsWord;
        }

        this._outputElement.value = result;
      } 
    }  
  }
  
  _sumDropdownValues() {
    let sum = 0;
    for (let item of this._items) {
      sum += +item._input.value;
    }
    return sum;
  }
  
  _toggleDropdown() {
    this._component.classList.toggle('dropdown_menu_open');
    this._outputElement.classList.toggle('input__input_dropdown_open');
    this._outputElement.classList.toggle('input__input_focused');
  } 
  
  _counterCanBeDecreased(item) {
    if (item.dataset.minCount) {
      return item._input.value > item.dataset.minCount;
    } else {
      return item._input.value > 0;
    }
  }
  
  _counterCanBeIncreased(item) {
    if (item.dataset.maxCount) {
      return item._input.value < item.dataset.maxCount;
    }
    return true;
  }
  
  _counterValueIsMinimal(item) {
    return item._input.value == item.dataset.minCount || item._input.value == 0;
  }

  _counterValueIsMaximal(item) {
    return item._input.value == item.dataset.maxCount;
  }
  
  _buttonResetIsNecessary() {
    for (let item of this._items) {   
      if (item._input.value == 0 || item._input.value == item.dataset.minCount) {
        continue;
      } else {
        return true;
      }
      return false;
    }
  }
  
  _resetDropdown() {
    for (let item of this._items) {
      item._input.value = item.dataset.minCount || 0;
      item._minus.disabled = true;
    }
    this._updateDropdownOutput();
  }
  
  _attachEventHandlers() {  
      
    this._outputElement.addEventListener('click', event => {
      this._toggleDropdown();    
    });
    
    for (let item of this._items) {
      item._minus.addEventListener('click', event => {
        if ( this._counterCanBeDecreased(item) ) {
          item._input.value--;
          if ( this._counterValueIsMinimal(item) ) {
            item._minus.disabled = true;
          }
          item._plus.disabled = false;
        }
        this._setPropertiesForThisType();
        this._updateDropdownOutput();
        this._applyButton.style.display = 'inline-block';
        if ( this._buttonResetIsNecessary() ) {
          this._resetButton.style.display = 'inline-block';
        } else {
          this._resetButton.style.display = 'none';
        }
      });

      item._plus.addEventListener('click', event => {
        if ( this._counterCanBeIncreased(item) ) {
          item._input.value++;
          if ( this._counterValueIsMaximal(item) ) {
            item._plus.disabled = true;
          }
          item._minus.disabled = false;
        }
        this._setPropertiesForThisType();
        this._updateDropdownOutput();
        this._applyButton.style.display = 'inline-block';
        this._resetButton.style.display = 'inline-block';
      });
    }
    
    this._resetButton.addEventListener('click', event => {
      this._resetDropdown();
      this._resetButton.style.display = 'none';
    });
    
    this._applyButton.addEventListener('click', event => {
      this._toggleDropdown();
      this._applyButton.style.display = 'none';
    });
    
  }
  
}

let dropdowns = document.querySelectorAll('.js-dropdown');
for (let dropdown of dropdowns) {
  new Dropdown(dropdown);
}


