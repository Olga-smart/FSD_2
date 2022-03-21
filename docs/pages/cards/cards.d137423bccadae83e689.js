"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[12],{

/***/ 68:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);
/* harmony import */ var _datepicker_datepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(414);
/* harmony import */ var _dropdown_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(109);
/* provided dependency */ var $ = __webpack_require__(638);






class CardBooking {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new CardBooking(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;

    this._inputArrival = component.querySelector('.js-card-booking__arrival');
    this._inputDeparture = component.querySelector('.js-card-booking__departure');
    this._dateArrival = undefined;
    this._dateDeparture = undefined;

    this._daysNumElement = component.querySelector('.js-card-booking__days');
    this._daysWordElement = component.querySelector('.js-card-booking__days-word');
    this._days = +this._daysNumElement.textContent;

    this._priceElement = component.querySelector('.js-card-booking__price');
    this._price = +CardBooking._extractNumbers(this._priceElement.textContent);
    this._priceForXDays = component.querySelector('.js-card-booking__price-for-x-days');

    this._serviceFeeElement = component.querySelector('.js-card-booking__discount');
    this._serviceFee = +CardBooking._extractNumbers(this._serviceFeeElement.textContent);

    this._discountElement = component.querySelector('.js-card-booking__discount');
    this._discount = +CardBooking._extractNumbers(this._discountElement.textContent);

    this._additionalServiceFeeElement = component.querySelector('.js-card-booking__additional-service-fee');
    this._additionalServiceFee = +CardBooking
      ._extractNumbers(this._additionalServiceFeeElement.textContent);

    this._totalElement = component.querySelector('.js-card-booking__total');

    this._infoIcons = component.querySelectorAll('.js-card-booking__info-icon');

    $(this._inputArrival).datepicker({
      onSelect: (fd, d) => {
        $(this._inputArrival).val(fd.split(' - ')[0]);
        $(this._inputDeparture).val(fd.split(' - ')[1]);
        [this._dateArrival, this._dateDeparture] = d;
        this._updateDaysNum();
      },
    });

    $(this._inputDeparture).datepicker({
      onSelect: (fd, d) => {
        $(this._inputArrival).val(fd.split(' - ')[0]);
        $(this._inputDeparture).val(fd.split(' - ')[1]);
        [this._dateArrival, this._dateDeparture] = d;
        this._updateDaysNum();
      },
    });
  }

  static _prettifyPrice(num) {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
  }

  static _extractNumbers(string) {
    return string.replace(/\D+/g, '');
  }

  static _handleInfoIconMouseover(event) {
    const { target } = event;

    const tooltip = document.createElement('div');
    tooltip.className = 'card-booking__tooltip';
    tooltip.innerHTML = target.dataset.tooltip;
    document.body.append(tooltip);

    const coords = target.getBoundingClientRect();
    tooltip.style.left = `${coords.left - tooltip.offsetWidth - 5}px`;
    tooltip.style.top = `${coords.top}px`;

    function handleInfoIconMouseout() {
      if (tooltip) {
        tooltip.remove();
      }
    }

    target.addEventListener('mouseout', handleInfoIconMouseout);
  }

  _attachEventHandlers() {
    Array.from(this._infoIcons).forEach((icon) => {
      icon.addEventListener('mouseover', CardBooking._handleInfoIconMouseover);
    });
  }

  _updateDaysNum() {
    this._days = Math.floor((this._dateDeparture - this._dateArrival) / (1000 * 3600 * 24));
    this._daysNumElement.textContent = this._days;
    this._updateDaysWord(this._days);
    this._updatePriceForXDays();
  }

  _updateDaysWord() {
    if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(this._days)) {
      this._daysWordElement.textContent = ' сутки';
    } else {
      this._daysWordElement.textContent = ' суток';
    }
  }

  _updatePriceForXDays() {
    this._priceForXDays.textContent = `${this._prettifyPrice(this._price * this._days)}₽`;
    this._updateTotal();
  }

  _updateTotal() {
    if (this._days === 0) {
      this._totalElement.textContent = '0₽';
    } else {
      this._totalElement.textContent = `${this._prettifyPrice(this._price * this._days + this._serviceFee - this._discount + this._additionalServiceFee)}₽`;
    }
  }
}

const cards = document.querySelectorAll('.js-card-booking');
CardBooking.init(cards);


/***/ }),

/***/ 511:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _datepicker_datepicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(414);
/* harmony import */ var _dropdown_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(109);






/***/ }),

/***/ 214:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(881);
/* provided dependency */ var $ = __webpack_require__(638);





__webpack_require__(455);
__webpack_require__(401);

class RoomCard {
  constructor(component) {
    this._initFields(component);
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new RoomCard(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._commentsNumber = +component.querySelector('.js-card-room__comments-number').textContent;
    this._commentsWordElement = component.querySelector('.js-card-room__comments-word');
    this._commentsWordElement.textContent = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._commentsNumber, 'Отзыв', 'Отзыва', 'Отзывов');

    this._slider = component.querySelector('.js-card-room__slider');
    $(this._slider).slick({
      dots: true,
    });
  }
}

const cards = document.querySelectorAll('.js-card-room');
RoomCard.init(cards);


/***/ }),

/***/ 44:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);





/***/ }),

/***/ 216:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);





/***/ }),

/***/ 414:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);
/* provided dependency */ var $ = __webpack_require__(638);



__webpack_require__(248);
__webpack_require__(77);

class Datepicker {
  constructor(component) {
    this._initFields(component);
    this._addApplyBtn();
    this._addStyleForBtns();

    if (this._component.defaultValue) {
      this._setDefaultDate();
    }

    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new Datepicker(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;

    const options = {
      clearButton: true,
      navTitles: {
        days: 'MM yyyy',
      },
      offset: 6,
      minDate: new Date(),
      language: {
        monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      },
      range: true,
      multipleDatesSeparator: ' - ',
    };

    if (component.classList.contains('date-start')) {
      options.onSelect = (fd) => {
        $(component).val(fd.split(' - ')[0]);
        const dateEnd = component.parentElement.parentElement.nextElementSibling.querySelector('.date-end');
        $(dateEnd).val(fd.split(' - ')[1]);
      };
    }

    if (component.classList.contains('date-end')) {
      options.onSelect = (fd) => {
        const dateStart = component.parentElement.parentElement.previousElementSibling.querySelector('.date-start');
        $(dateStart).val(fd.split(' - ')[0]);
        $(component).val(fd.split(' - ')[1]);
      };
      options.position = 'bottom right';
    }

    $(component).datepicker(options);

    this._calendar = $(component).data('datepicker');
    [this._calendarElement] = this._calendar.$datepicker;
  }

  _addApplyBtn() {
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Применить';
    applyBtn.className = 'datepicker--button button';
    applyBtn.dataset.action = 'hide';

    const btnsContainer = this._calendarElement.querySelector('.datepicker--buttons');
    btnsContainer.append(applyBtn);
  }

  _addStyleForBtns() {
    const btns = this._calendarElement.querySelectorAll('.datepicker--button');
    Array.from(btns).forEach((btn) => {
      btn.classList.add('button');
    });
  }

  _setDefaultDate() {
    if (this._component.defaultValue.includes(' - ')) {
      this._calendar.selectDate([
        new Date(Date.parse(this._component.defaultValue.slice(0, 10))),
        new Date(Date.parse(this._component.defaultValue.slice(13))),
      ]);
    } else {
      this._calendar.selectDate(new Date(Date.parse(this._component.defaultValue)));
    }
  }

  static _handleKeyDown(event) {
    event.preventDefault();
  }

  _attachEventHandlers() {
    this._component.addEventListener('keydown', Datepicker._handleKeyDown);
  }
}

const datepickers = document.querySelectorAll('.datepicker-here');
Datepicker.init(datepickers);


/***/ }),

/***/ 109:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(881);





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
    this._guestsWord = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._guestsCount, 'гость', 'гостя', 'гостей');

    this._babiesCount = +this._items[2]._input.value;
    this._babiesWord = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._babiesCount, 'младенец', 'младенца', 'младенцев');
  }

  _setFacilitiesProperties() {
    this._bedroomsCount = +this._items[0]._input.value;
    this._bedroomsWord = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._bedroomsCount, 'спальня', 'спальни', 'спален');

    this._bedsCount = +this._items[1]._input.value;
    this._bedsWord = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._bedsCount, 'кровать', 'кровати', 'кроватей');

    this._bathroomsCount = +this._items[2]._input.value;
    this._bathroomsWord = (0,_helpers_word_to_plural_word_to_plural__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(this._bathroomsCount, 'ванная', 'ванные', 'ванных');
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


/***/ }),

/***/ 490:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var cleave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(824);
/* eslint-disable no-new */
/* Because this is third party plugin */





if (document.querySelector('.js-input_birthday')) {
  new cleave_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z('.js-input_birthday', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  });
}


/***/ }),

/***/ 881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function wordToPlural(number, wordWith1, wordWith2, wordWith5) {
  let result = wordWith5;

  function lastDigit(num) {
    return +num.toString().slice(-1);
  }

  function last2Digits(num) {
    return +num.toString().slice(-2);
  }

  if ([1, 21, 31, 41, 51, 61, 71, 81, 91].includes(last2Digits(number))) {
    result = wordWith1;
  }

  if ([2, 3, 4].includes(lastDigit(number)) && ![12, 13, 14].includes(last2Digits(number))) {
    result = wordWith2;
  }

  return result;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wordToPlural);


/***/ }),

/***/ 230:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _components_card_booking_card_booking__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _components_card_find_room_card_find_room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(511);
/* harmony import */ var _components_card_room_card_room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(214);
/* harmony import */ var _components_card_sign_in_card_sign_in__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(44);
/* harmony import */ var _components_card_sign_up_card_sign_up__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(216);










/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [216], () => (__webpack_exec__(230)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);