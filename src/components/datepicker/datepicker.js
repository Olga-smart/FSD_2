require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

import './datepicker.scss';

import '../input/input.js'

$('.datepicker-here').datepicker({
  clearButton: true,
  navTitles: {
    days: 'MM yyyy'
  },
  offset: 6,
  minDate: new Date(),
  language: {
    monthsShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
  },
  range: true,
  multipleDatesSeparator: ' - '
})

let calendars = document.querySelectorAll('.datepicker');
for (let calendar of calendars) {
  addStyleForBtns(calendar);
  addApplyBtn(calendar);
}

function addStyleForBtns(calendar) {
  let btns = calendar.querySelectorAll('.datepicker--button');
  for (let btn of btns) {
    btn.classList.add('button');
  }
}

function addApplyBtn(calendar) {
  let applyBtn = document.createElement('button');
  applyBtn.textContent = 'Применить';
  applyBtn.className = 'datepicker--button button';
  
  let btnsContainer = calendar.querySelector('.datepicker--buttons');
  btnsContainer.append(applyBtn);
  addLogicForApplyBtn(applyBtn);
}

function addLogicForApplyBtn(btn) {
  btn.addEventListener('click', function() {
    let thisCalendar = btn.closest('.datepicker');
    thisCalendar.classList.remove('active');
    $('.datepicker-here').blur();
  });
}

let calendarInputs = document.querySelectorAll('.datepicker-here');
for (let input of calendarInputs) {
  let myDatepicker = $(input).datepicker().data('datepicker');
  if (input.defaultValue) {    
    if (input.defaultValue.includes(' - ')) {
      myDatepicker.selectDate([
        new Date( Date.parse( input.defaultValue.slice(0, 10) ) ),
        new Date( Date.parse( input.defaultValue.slice(13) ) )
      ]);
    } else {
      myDatepicker.selectDate( new Date( Date.parse(input.defaultValue) ) );
    }
  }
  input.addEventListener('keydown', function(e) {
    e.preventDefault();
  });
}

let dateStartCollection = document.querySelectorAll('.date-start');
for (let dateStart of dateStartCollection) {
  $(dateStart).datepicker({
    onSelect: function(fd, d, picker) {
      $(dateStart).val(fd.split(" - ")[0]);
      let dateEnd = dateStart.parentElement.parentElement.nextElementSibling.querySelector('.date-end');
      $(dateEnd).val(fd.split(" - ")[1]);
    }
  })
}

let dateEndCollection = document.querySelectorAll('.date-end');
for (let dateEnd of dateEndCollection) {
  $(dateEnd).datepicker({
    onSelect: function(fd, d, picker) {
      let dateStart = dateEnd.parentElement.parentElement.previousElementSibling.querySelector('.date-start');
      $(dateStart).val(fd.split(" - ")[0]);
      $(dateEnd).val(fd.split(" - ")[1]);
    },
    position: "bottom right"
  })
}










