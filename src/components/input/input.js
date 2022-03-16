/* eslint-disable no-new */
/* Because this is third party plugin */

import './input.scss';

import Cleave from 'cleave.js';

if (document.querySelector('.js-input_birthday')) {
  new Cleave('.js-input_birthday', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  });
}
