import './header.scss';

import '../logo/logo.js'
import '../button/button.js'

class Header {
  
  constructor(component) {
    this._component = component;
    this._burger = component.querySelector('.js-header__burger');
    this._menu = component.querySelector('.js-header__menu');
    this._attachEventHandlers();
  }
  
  _attachEventHandlers() {
    this._burger.addEventListener('click', (event) => {
      this._burger.classList.toggle('header__burger_menu_open');
      this._menu.classList.toggle('header__menu_open');
    });
  }
}

let headers = document.querySelectorAll('.header');
for (let header of headers) {
  new Header(header);
} 