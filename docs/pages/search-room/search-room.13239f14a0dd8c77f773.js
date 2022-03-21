"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[769],{

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

/***/ 509:
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

/***/ 267:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _checklist_checklist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(509);



class ExpandableChecklist {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new ExpandableChecklist(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._title = component.querySelector('.js-expandable-checklist__title');
  }

  _handleTitleClick() {
    this._component.classList.toggle('expandable-checklist_open');
  }

  _attachEventHandlers() {
    this._title.addEventListener('click', this._handleTitleClick.bind(this));
  }
}

const lists = document.querySelectorAll('.js-expandable-checklist');
ExpandableChecklist.init(lists);


/***/ }),

/***/ 718:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_with_button_input_with_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(565);





/***/ }),

/***/ 653:
/***/ (() => {





class Header {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    Array.from(elements).forEach((element) => {
      arr.push(new Header(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._burger = component.querySelector('.js-header__burger');
    this._menu = component.querySelector('.js-header__menu');
  }

  _handleBurgerClick() {
    this._burger.classList.toggle('header__burger_menu_open');
    this._menu.classList.toggle('header__menu_open');
  }

  _attachEventHandlers() {
    this._burger.addEventListener('click', this._handleBurgerClick.bind(this));
  }
}

const headers = document.querySelectorAll('.header');
Header.init(headers);


/***/ }),

/***/ 565:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);




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

/***/ 239:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _card_room_card_room__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(214);
/* provided dependency */ var $ = __webpack_require__(638);
/* eslint-disable no-param-reassign */
/* eslint-disable fsd/jq-use-js-prefix-in-selector */
/* Because this is third party plugin */




__webpack_require__(153);

const paginationCards = document.querySelectorAll('.js-pagination__item');
const paginationArr = Array.from(paginationCards);

function template(data) {
  let html = '';
  $.each(data, (index, item) => {
    html += item.outerHTML;
  });
  return html;
}

$('.js-pagination').pagination({
  dataSource: paginationArr,
  showNavigator: true,
  pageSize: 12,
  autoHidePrevious: true,
  autoHideNext: true,
  prevText: '',
  nextText: '',
  pageRange: 1,
  ulClassName: 'paginationjs-list',
  formatNavigator(currentPage, totalPage, totalNumber) {
    const firstNum = (currentPage - 1) * 12 + 1;
    let lastNum = firstNum + 11;
    if (lastNum > totalNumber) {
      lastNum = totalNumber;
    }
    if (totalNumber > 100) {
      totalNumber = '100+';
    }
    return `${firstNum} - ${lastNum} из ${totalNumber}  вариантов аренды`;
  },
  callback(data) {
    const html = template(data);
    $('.pagination__data-container').html(html);
  },
  afterPaging() {
    $('.js-card-room__slider').slick({
      dots: true,
    });
  },
});


/***/ }),

/***/ 427:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(638);


__webpack_require__(141);
__webpack_require__(45);

const output = document.querySelector('.js-range__output');

$('.js-range-slider').ionRangeSlider({
  skin: 'round',
  type: 'double',
  hide_min_max: true,
  hide_from_to: true,
  onStart(data) {
    output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
  },
  onChange(data) {
    output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
  },
});


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _input_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(490);




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

/***/ 702:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./components/footer/footer.js
var footer = __webpack_require__(718);
// EXTERNAL MODULE: ./components/header/header.js
var header = __webpack_require__(653);
// EXTERNAL MODULE: ./components/datepicker/datepicker.js
var datepicker = __webpack_require__(414);
// EXTERNAL MODULE: ./components/dropdown/dropdown.js
var dropdown = __webpack_require__(109);
// EXTERNAL MODULE: ./components/range/range.js
var range = __webpack_require__(427);
// EXTERNAL MODULE: ./components/checklist/checklist.js
var checklist = __webpack_require__(509);
// EXTERNAL MODULE: ./components/rich-checklist/rich-checklist.js
var rich_checklist = __webpack_require__(219);
// EXTERNAL MODULE: ./components/expandable-checklist/expandable-checklist.js
var expandable_checklist = __webpack_require__(267);
// EXTERNAL MODULE: ./components/card-room/card-room.js
var card_room = __webpack_require__(214);
// EXTERNAL MODULE: ./components/pagination/pagination.js
var pagination = __webpack_require__(239);
;// CONCATENATED MODULE: ./pages/search-room/search-room-data.json
const search_room_data_namespaceObject = JSON.parse('[{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg","../../img/room1.jpg"],"number":840,"lux":false,"price":9900,"rate":4,"comments":65},{"images":["../../img/room3.jpg","../../img/room4.jpg","../../img/room5.jpg","../../img/room6.jpg"],"number":980,"lux":true,"price":8500,"rate":3,"comments":35},{"images":["../../img/room4.jpg","../../img/room5.jpg","../../img/room6.jpg","../../img/room7.jpg"],"number":856,"lux":false,"price":7300,"rate":5,"comments":19},{"images":["../../img/room5.jpg","../../img/room6.jpg","../../img/room7.jpg","../../img/room8.jpg"],"number":740,"lux":false,"price":6000,"rate":4,"comments":44},{"images":["../../img/room6.jpg","../../img/room7.jpg","../../img/room8.jpg","../../img/room9.jpg"],"number":982,"lux":false,"price":5800,"rate":3,"comments":56},{"images":["../../img/room7.jpg","../../img/room8.jpg","../../img/room9.jpg","../../img/room10.jpg"],"number":978,"lux":false,"price":5400,"rate":5,"comments":45},{"images":["../../img/room8.jpg","../../img/room9.jpg","../../img/room10.jpg","../../img/room11.jpg"],"number":450,"lux":false,"price":5300,"rate":4,"comments":39},{"images":["../../img/room9.jpg","../../img/room10.jpg","../../img/room11.jpg","../../img/room12.jpg"],"number":350,"lux":false,"price":5000,"rate":3,"comments":77},{"images":["../../img/room10.jpg","../../img/room11.jpg","../../img/room12.jpg","../../img/room1.jpg"],"number":666,"lux":false,"price":5000,"rate":5,"comments":25},{"images":["../../img/room11.jpg","../../img/room12.jpg","../../img/room1.jpg","../../img/room2.jpg"],"number":444,"lux":false,"price":5000,"rate":3,"comments":15},{"images":["../../img/room12.jpg","../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg"],"number":352,"lux":false,"price":5000,"rate":3,"comments":55},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145},{"images":["../../img/room1.jpg","../../img/room2.jpg","../../img/room3.jpg","../../img/room4.jpg"],"number":888,"lux":true,"price":9990,"rate":5,"comments":145}]');
;// CONCATENATED MODULE: ./pages/search-room/search-room.js
/* provided dependency */ var $ = __webpack_require__(638);
/* eslint-disable fsd/jq-use-js-prefix-in-selector */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* Because this is third party plugin */
















const filledStar = __webpack_require__(846);
const emptyStar = __webpack_require__(522);

const filtersToggle = document.querySelector('.js-search-room__filters-toggle');
const filters = document.querySelector('.js-search-room__filters');
function handleFiltersToggleClick() {
  filters.classList.toggle('search-room__filters_open');
}
filtersToggle.addEventListener('click', handleFiltersToggleClick);

// Переопределяем инициализацию Pagination, т. к. данные будем брать из JSON
$('.js-pagination').pagination({
  dataSource: search_room_data_namespaceObject,
  showNavigator: true,
  pageSize: 12,
  autoHidePrevious: true,
  autoHideNext: true,
  prevText: '',
  nextText: '',
  pageRange: 1,
  ulClassName: 'paginationjs-list',
  formatNavigator(currentPage, totalPage, totalNumber) {
    const firstNum = (currentPage - 1) * 12 + 1;
    let lastNum = firstNum + 11;
    if (lastNum > totalNumber) {
      lastNum = totalNumber;
    }
    if (totalNumber > 100) {
      totalNumber = '100+';
    }
    return `${firstNum} - ${lastNum} из ${totalNumber}  вариантов аренды`;
  },
  callback(data) {
    // eslint-disable-next-line no-use-before-define
    const html = template(data);
    $('.pagination__data-container').html(html);
  },
  afterPaging() {
    $('.js-card-room__slider').slick({
      dots: true,
    });
  },
});

function prettifyPrice(num) {
  const n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1 ');
}

function template(data) {
  const html = new DocumentFragment();
  $.each(data, (index, item) => {
    const card = document.createElement('div');
    card.className = 'card-room js-card-room.card';

    const slider = document.createElement('div');
    slider.className = 'card-room__slider js-card-room__slider';
    Array.from(item.images).forEach((img) => {
      const pic = document.createElement('img');
      pic.className = 'card-room__img';
      pic.src = img;
      slider.append(pic);
    });

    const info = document.createElement('div');
    info.className = 'card-room__info';

    const numberContainer = document.createElement('div');
    numberContainer.className = 'card-room__number-container';

    const numberSign = document.createElement('span');
    numberSign.className = 'card-room__number-sign';
    numberSign.textContent = '№ ';
    numberContainer.append(numberSign);

    const number = document.createElement('span');
    number.className = 'card-room__number';
    number.textContent = item.number;
    numberContainer.append(number);

    if (item.lux) {
      const lux = document.createElement('span');
      lux.className = 'card-room__lux';
      lux.textContent = ' люкс';
      numberContainer.append(lux);
    }

    const priceContainer = document.createElement('div');
    priceContainer.className = 'card-room__price-container';

    const price = document.createElement('span');
    price.className = 'card-room__price';
    price.textContent = `${prettifyPrice(item.price)}₽`;
    priceContainer.append(price);

    const perDay = document.createElement('span');
    perDay.textContent = ' в сутки';
    priceContainer.append(perDay);

    const hr = document.createElement('div');
    hr.className = 'card-room__hr';

    const rate = document.createElement('div');
    rate.className = 'rate';

    const star1 = document.createElement('img');
    star1.className = 'rate__star';
    star1.src = item.rate > 0 ? filledStar : emptyStar;
    rate.append(star1);

    const star2 = document.createElement('img');
    star2.className = 'rate__star';
    star2.src = item.rate > 1 ? filledStar : emptyStar;
    rate.append(star2);

    const star3 = document.createElement('img');
    star3.className = 'rate__star';
    star3.src = item.rate > 2 ? filledStar : emptyStar;
    rate.append(star3);

    const star4 = document.createElement('img');
    star4.className = 'rate__star';
    star4.src = item.rate > 3 ? filledStar : emptyStar;
    rate.append(star4);

    const star5 = document.createElement('img');
    star5.className = 'rate__star';
    star5.src = item.rate > 4 ? filledStar : emptyStar;
    rate.append(star5);

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'card-room__comments-container';

    const commentsNumber = document.createElement('span');
    commentsNumber.className = 'card-room__comments-number js-card-room__comments-number';
    commentsNumber.textContent = `${item.comments} `;
    commentsContainer.append(commentsNumber);

    const commentsWord = document.createElement('span');
    commentsWord.className = 'card-room__comments-word js-card-room__comments-word';
    commentsWord.textContent = 'Отзывов';
    commentsContainer.append(commentsWord);

    info.append(numberContainer);
    info.append(priceContainer);
    info.append(hr);
    info.append(rate);
    info.append(commentsContainer);

    card.append(slider);
    card.append(info);
    html.append(card);
  });
  return html;
}


/***/ }),

/***/ 846:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/star.ae5e47964db9b80b650f.svg";

/***/ }),

/***/ 522:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/star_border.badd4e5be2f69f70bdb4.svg";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [216], () => (__webpack_exec__(702)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);