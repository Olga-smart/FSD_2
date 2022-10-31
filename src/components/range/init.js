import IonRangeSlider from '../../libs/ion-rangeslider/init';

const ranges = document.querySelectorAll('.js-range');
ranges.forEach((range) => {
  const input = range.querySelector('.js-range__slider');
  const output = range.querySelector('.js-range__output');
  IonRangeSlider.init(input, output);
});
