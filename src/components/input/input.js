import './input.scss';

import Cleave from 'cleave.js';

if (document.querySelector('.js-input_birthday')) {
  let cleave = new Cleave('.js-input_birthday', {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y']
  });
}
