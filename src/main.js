import './connect-jquery.js';
import jquery from "jquery";

require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.js');
require('item-quantity-dropdown/lib/item-quantity-dropdown.min.css');

$(document).ready(() => {
  $('.iqdropdown').iqDropdown({});
});

import Cleave from 'cleave.js';

var cleave = new Cleave('.birthday-input', {
    date: true,
    datePattern: ['d', 'm', 'Y']
});