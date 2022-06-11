/* eslint-disable no-new */
// Because this is third party plugin
import Cleave from 'cleave.js';

import './input.scss';

if (document.querySelector('.js-input_date')) {
  new Cleave('.js-input_date', {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  });
}
