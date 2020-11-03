import './connect-jquery.js';
import jquery from "jquery";

require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.js');
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.css');

$(document).ready(() => {
  $('.iqdropdown').iqDropdown({
    setSelectionText: (itemCount, totalItems) => {
      if (totalItems == 0) {
        return 'Сколько гостей';
      }
      if (totalItems == 1 || totalItems == 21) {
        return totalItems + ' гость';
      }
      if (totalItems >= 2 && totalItems <= 4) {
        return totalItems + ' гостя';
      }
      return totalItems + ' гостей';
    }
  });
});

import Cleave from 'cleave.js';

var cleave = new Cleave('.birthday-input', {
    date: true,
    datePattern: ['d', 'm', 'Y']
});

import './theme/style.scss';