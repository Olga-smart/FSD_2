require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

$('.datepicker-here').datepicker({
  clearButton: true
})

let datepickerBtns = document.querySelectorAll('.datepicker--button');
for (let datepickerBtn of datepickerBtns) {
  datepickerBtn.classList.add('button');
}

let datepickerApplyBtn = document.createElement('button');
datepickerApplyBtn.textContent = 'Применить';
datepickerApplyBtn.className = 'datepicker--button button';

let datepickerBtnsContainers = document.querySelectorAll('.datepicker--buttons');
for (let datepickerBtnsContainer of datepickerBtnsContainers) {
  datepickerBtnsContainer.append(datepickerApplyBtn.cloneNode(true));
}