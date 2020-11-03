import './connect-jquery.js';
import jquery from "jquery";

require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

import Cleave from 'cleave.js';

var cleave = new Cleave('.birthday-input', {
    date: true,
    datePattern: ['d', 'm', 'Y']
});

import './components/dropdown/dropdown.js';
import './theme/style.scss';