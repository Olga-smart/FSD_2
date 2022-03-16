import './dropdown.scss';
import '../button/button';

import wordToPlural from '../../helpers/word-to-plural/word-to-plural';

class Dropdown {
  constructor(component) {
    this._initFields(component);
    this._setPropertiesForThisType();
    this._updateDropdownOutput();

    if (this._buttonResetIsNecessary()) {
      this._resetButton.style.display = 'inline-block';
    }

    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new Dropdown(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._type = component.dataset.type;
    this._outputElement = component.querySelector('.js-dropdown__output .js-input .js-input__input');

    this._items = component.querySelectorAll('.js-dropdown__item');
    Array.from(this._items).forEach((item) => {
      const currentItem = item;

      currentItem._input = item.querySelector('.js-dropdown__item-input');
      currentItem._minus = item.querySelector('.js-dropdown__button-minus');
      currentItem._plus = item.querySelector('.js-dropdown__button-plus');

      if (Dropdown._counterValueIsMinimal(item)) {
        currentItem._minus.disabled = true;
      }
      if (Dropdown._counterValueIsMaximal(item)) {
        currentItem._plus.disabled = true;
      }
    });

    this._applyButton = component.querySelector('.js-dropdown__button-apply');
    this._resetButton = component.querySelector('.js-dropdown__button-reset');

    if (this._type === 'guests') {
      this._zeroValue = 'Сколько гостей';
    }

    if (this._type === 'facilities') {
      this._zeroValue = 'Выберите удобства';
    }
  }

  _setPropertiesForThisType() {
    if (this._type === 'guests') {
      this._setGuestsProperties();
    }

    if (this._type === 'facilities') {
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
    if (this._sumDropdownValues() === 0) {
      this._outputElement.value = this._zeroValue;
    } else {
      if (this._type === 'guests') {
        if (this._babiesCount === 0) {
          this._outputElement.value = `${this._guestsCount} ${this._guestsWord}`;
        } else {
          this._outputElement.value = `${this._guestsCount} ${this._guestsWord}, ${this._babiesCount} ${this._babiesWord}`;
        }
      }

      if (this._type === 'facilities') {
        let result = '';

        if (this._bedroomsCount > 0) {
          result += `${this._bedroomsCount} ${this._bedroomsWord}`;
        }

        if (this._bedsCount > 0) {
          if (result.length > 0) {
            result += ', ';
          }
          result += `${this._bedsCount} ${this._bedsWord}`;
        }

        if (this._bathroomsCount > 0) {
          if (result.length > 0) {
            result += ', ';
          }
          result += `${this._bathroomsCount} ${this._bathroomsWord}`;
        }

        this._outputElement.value = result;
      }
    }
  }

  _sumDropdownValues() {
    let sum = 0;
    Array.from(this._items).forEach((item) => {
      sum += +item._input.value;
    });
    return sum;
  }

  _toggleDropdown() {
    this._component.classList.toggle('dropdown_menu_open');
    this._outputElement.classList.toggle('input__input_dropdown_open');
    this._outputElement.classList.toggle('input__input_focused');
  }

  static _counterCanBeDecreased(item) {
    if (item.dataset.minCount) {
      return item._input.value > item.dataset.minCount;
    }
    return item._input.value > 0;
  }

  static _counterCanBeIncreased(item) {
    if (item.dataset.maxCount) {
      return item._input.value < item.dataset.maxCount;
    }
    return true;
  }

  static _counterValueIsMinimal(item) {
    return item._input.value === item.dataset.minCount || item._input.value === 0;
  }

  static _counterValueIsMaximal(item) {
    return item._input.value === item.dataset.maxCount;
  }

  _buttonResetIsNecessary() {
    function mayBeReset(item) {
      if (item._input.value === '0' || item._input.value === item.dataset.minCount) {
        return false;
      }
      return true;
    }

    const result = Array.from(this._items).find((item) => mayBeReset(item));

    return Boolean(result);
  }

  _resetDropdown() {
    Array.from(this._items).forEach((item) => {
      const currentItem = item;
      currentItem._input.value = item.dataset.minCount || 0;
      currentItem._minus.disabled = true;
    });
    this._updateDropdownOutput();
  }

  _handleOutputClick() {
    this._toggleDropdown();
  }

  _handleMinusClick(event) {
    const item = event.target.closest('.js-dropdown__item');

    if (Dropdown._counterCanBeDecreased(item)) {
      item._input.value -= 1;
      if (Dropdown._counterValueIsMinimal(item)) {
        item._minus.disabled = true;
      }
      item._plus.disabled = false;
    }

    this._setPropertiesForThisType();
    this._updateDropdownOutput();
    this._applyButton.style.display = 'inline-block';

    if (this._buttonResetIsNecessary()) {
      this._resetButton.style.display = 'inline-block';
    } else {
      this._resetButton.style.display = 'none';
    }
  }

  _handlePlusClick(event) {
    const item = event.target.closest('.js-dropdown__item');

    if (Dropdown._counterCanBeIncreased(item)) {
      item._input.value = Number(item._input.value) + 1;
      if (Dropdown._counterValueIsMaximal(item)) {
        item._plus.disabled = true;
      }
      item._minus.disabled = false;
    }

    this._setPropertiesForThisType();
    this._updateDropdownOutput();
    this._applyButton.style.display = 'inline-block';
    this._resetButton.style.display = 'inline-block';
  }

  _handleResetButtonClick() {
    this._resetDropdown();
    this._resetButton.style.display = 'none';
  }

  _handleApplyButtonClick() {
    this._toggleDropdown();
    this._applyButton.style.display = 'none';
  }

  _attachEventHandlers() {
    this._outputElement.addEventListener('click', this._handleOutputClick.bind(this));

    Array.from(this._items).forEach((item) => {
      item._minus.addEventListener('click', this._handleMinusClick.bind(this));

      item._plus.addEventListener('click', this._handlePlusClick.bind(this));
    });

    this._resetButton.addEventListener('click', this._handleResetButtonClick.bind(this));

    this._applyButton.addEventListener('click', this._handleApplyButtonClick.bind(this));
  }
}

const dropdowns = document.querySelectorAll('.js-dropdown');
Dropdown.init(dropdowns);
