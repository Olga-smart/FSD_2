"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[37],{

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

/***/ 781:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _components_footer_footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(718);
/* harmony import */ var _components_header_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653);







/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [216], () => (__webpack_exec__(781)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);