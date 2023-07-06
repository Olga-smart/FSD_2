import wordToPlural from '../../helpers/wordToPlural/wordToPlural';
import Input from '../input/Input';

class Dropdown {
  constructor(component) {
    this._initFields(component);
    this._disablePlusMinusButtons();
    this._setProperties();
    this._updateOutput();

    if (this._buttonResetIsNecessary()) {
      this._resetButton.style.display = 'inline-block';
    }

    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    this._attachEventHandlers();
  }

  _initFields(component) {
    this._component = component;
    this._type = component.dataset.type;
    this._output = component.querySelector('.js-dropdown__output');
    this._outputAPI = new Input(this._output);
    this._items = this._makeItemsArray();
    this._applyButton = component.querySelector('.js-dropdown__button-apply');
    this._resetButton = component.querySelector('.js-dropdown__button-reset');

    if (this._type === 'guests') {
      this._zeroValue = 'Сколько гостей';
    }

    if (this._type === 'facilities') {
      this._zeroValue = 'Выберите удобства';
    }
  }

  _makeItemsArray() {
    const arr = [];

    [...this._component.querySelectorAll('.js-dropdown__item')].forEach((item) => {
      arr.push({
        item,
        input: item.querySelector('.js-dropdown__item-input'),
        minus: item.querySelector('.js-dropdown__button-minus'),
        plus: item.querySelector('.js-dropdown__button-plus'),
      });
    });

    return arr;
  }

  _disablePlusMinusButtons() {
    [...this._items].forEach((item) => {
      const currentItem = item;

      if (this._counterValueIsMinimal(item)) {
        currentItem.minus.disabled = true;
      }
      if (this._counterValueIsMaximal(item)) {
        currentItem.plus.disabled = true;
      }
    });
  }

  _setProperties() {
    if (this._type === 'guests') {
      this._setGuestsProperties();
    }

    if (this._type === 'facilities') {
      this._setFacilitiesProperties();
    }
  }

  _setGuestsProperties() {
    this._guestsCount = Number(this._items[0].input.value)
                      + Number(this._items[1].input.value);
    this._guestsWord = wordToPlural(this._guestsCount, 'гость', 'гостя', 'гостей');

    this._babiesCount = Number(this._items[2].input.value);
    this._babiesWord = wordToPlural(this._babiesCount, 'младенец', 'младенца', 'младенцев');
  }

  _setFacilitiesProperties() {
    this._bedroomsCount = Number(this._items[0].input.value);
    this._bedroomsWord = wordToPlural(this._bedroomsCount, 'спальня', 'спальни', 'спален');

    this._bedsCount = Number(this._items[1].input.value);
    this._bedsWord = wordToPlural(this._bedsCount, 'кровать', 'кровати', 'кроватей');

    this._bathroomsCount = Number(this._items[2].input.value);
    this._bathroomsWord = wordToPlural(this._bathroomsCount, 'ванная', 'ванные', 'ванных');
  }

  _updateOutput() {
    if (this._sumValues() === 0) {
      this._outputAPI.setValue(this._zeroValue);
    } else {
      if (this._type === 'guests') {
        if (this._babiesCount === 0) {
          this._outputAPI.setValue(`${this._guestsCount} ${this._guestsWord}`);
        } else {
          this._outputAPI.setValue(`${this._guestsCount} ${this._guestsWord}, ${this._babiesCount} ${this._babiesWord}`);
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

        this._outputAPI.setValue(result);
      }
    }
  }

  _sumValues() {
    return [...this._items].reduce((sum, item) => sum + item.input.value, 0);
  }

  _toggle() {
    this._component.classList.toggle('dropdown_menu_open');

    if (this._component.classList.contains('dropdown_menu_open')) {
      this._outputAPI.addFlatBottom();
      this._outputAPI.addFocusStyle();
      window.addEventListener('click', this._handleOutsideClick);
    } else {
      this._outputAPI.removeFlatBottom();
      this._outputAPI.removeFocusStyle();
    }
  }

  _counterValueIsMinimal(item) {
    return item.input.value === item.item.dataset.minCount || item.input.value === '0';
  }

  _counterValueIsMaximal(item) {
    return item.input.value === item.item.dataset.maxCount;
  }

  _buttonResetIsNecessary() {
    const mayBeReset = (item) => {
      const { value } = item.input;

      if (value === '0' || value === item.item.dataset.minCount) {
        return false;
      }

      return true;
    };

    const result = [...this._items].find((item) => mayBeReset(item));

    return Boolean(result);
  }

  _reset() {
    [...this._items].forEach((item) => {
      const currentItem = item;
      currentItem.input.value = item.item.dataset.minCount || 0;
      currentItem.minus.disabled = true;
      currentItem.plus.disabled = false;
    });

    this._setProperties();
    this._updateOutput();
  }

  _handleOutputClick() {
    this._toggle();
  }

  _handleMinusClick(item) {
    const currentItem = item;

    if (!this._counterValueIsMinimal(item)) {
      currentItem.input.value -= 1;

      if (this._counterValueIsMinimal(item)) {
        currentItem.minus.disabled = true;
      }

      currentItem.plus.disabled = false;
    }

    this._setProperties();
    this._updateOutput();
    this._applyButton.style.display = 'inline-block';

    if (this._buttonResetIsNecessary()) {
      this._resetButton.style.display = 'inline-block';
    } else {
      this._resetButton.style.display = 'none';
    }
  }

  _handlePlusClick(item) {
    const currentItem = item;

    if (!this._counterValueIsMaximal(item)) {
      currentItem.input.value = Number(currentItem.input.value) + 1;

      if (this._counterValueIsMaximal(item)) {
        currentItem.plus.disabled = true;
      }

      currentItem.minus.disabled = false;
    }

    this._setProperties();
    this._updateOutput();
    this._applyButton.style.display = 'inline-block';
    this._resetButton.style.display = 'inline-block';
  }

  _handleResetButtonClick() {
    this._reset();
    this._resetButton.style.display = 'none';
  }

  _handleApplyButtonClick() {
    this._toggle();
    window.removeEventListener('click', this._handleOutsideClick);
    this._applyButton.style.display = 'none';
  }

  _handleOutsideClick(event) {
    const { target } = event;
    const clickOnDropdown = this._component.contains(target);

    if (!clickOnDropdown) {
      this._toggle();
      window.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _attachEventHandlers() {
    this._output.addEventListener('click', this._handleOutputClick.bind(this));

    [...this._items].forEach((item) => {
      item.minus.addEventListener('click', this._handleMinusClick.bind(this, item));
      item.plus.addEventListener('click', this._handlePlusClick.bind(this, item));
    });

    this._resetButton.addEventListener('click', this._handleResetButtonClick.bind(this));
    this._applyButton.addEventListener('click', this._handleApplyButtonClick.bind(this));
  }
}

export default Dropdown;
