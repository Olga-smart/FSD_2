import './header.scss';

import '../logo/logo.js'
import '../button/button.js'

let headers = document.querySelectorAll('.header');
for (let header of headers) {
  let burger = header.querySelector('.js-header__burger');
  let menu = header.querySelector('.js-header__menu')
  burger.addEventListener('click', function() {
    burger.classList.toggle('header__burger_menu_open');
    menu.classList.toggle('header__menu_open');
  });
} 