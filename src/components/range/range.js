import './range.scss';

require('ion-rangeslider');
require('ion-rangeslider/css/ion.rangeSlider.min.css');

const output = document.querySelector('.js-range__output');

$('.js-range-slider').ionRangeSlider({
  skin: 'round',
  type: 'double',
  hide_min_max: true,
  hide_from_to: true,
  onStart(data) {
    output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
  },
  onChange(data) {
    output.textContent = `${data.from_pretty}₽ - ${data.to_pretty}₽`;
  },
});
