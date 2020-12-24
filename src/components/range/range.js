require('ion-rangeslider');
require('ion-rangeslider/css/ion.rangeSlider.min.css');

import './range.scss';

let output = document.querySelector('.js-range__output');

$('.js-range-slider').ionRangeSlider({
  skin: 'round',
  type: 'double',
  hide_min_max: true,
  hide_from_to: true,
  onStart: function(data) {
    output.textContent = data.from_pretty + '₽' + ' - ' + data.to_pretty + '₽';
  },
  onChange: function(data) {
    output.textContent = data.from_pretty + '₽' + ' - ' + data.to_pretty + '₽';
  }
});

import './range.scss';


