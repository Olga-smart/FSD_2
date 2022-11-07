/* eslint-disable no-new */
// Because this is third party plugin
import Cleave from 'cleave.js';

const cleaveInit = (element) => {
  new Cleave(element, {
    date: true,
    delimiter: '.',
    datePattern: ['d', 'm', 'Y'],
  });
};

export default cleaveInit;
