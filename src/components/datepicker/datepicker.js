"use strict";
require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

$('.datepicker-here').datepicker({
  clearButton: true,
  navTitles: {
    days: 'MM yyyy'
  },
  offset: 6,
  minDate: new Date(),
  language: {
    monthsShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек']
  }
})

let calendars = document.querySelectorAll('.datepicker');
for (let calendar of calendars) {
  addStyleForBtns(calendar);
  addApplyBtn(calendar);
//  setWidthForCalendar(calendar);
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

function setWidthForCalendar(calendar) {
  let input = document.querySelector('.datepicker-here');
  calendar.style.width = input.offsetWidth + 'px';
  if (document.querySelector('.double-datepicker-wrap')) {
    calendar.style.width = document.querySelector('.double-datepicker-wrap').offsetWidth + 'px';
  }
}

$('#date-start').datepicker({ 
  onSelect: function (fd, d, picker) { 
    $("#date-start").val(fd.split("-")[0]);
    $("#date-end").val(fd.split("-")[1]);
  }
});

let dateStart = document.querySelector('#date-start');
let myDatepickerForDateStart = $('#date-start').datepicker().data('datepicker');
if ( dateStart.defaultValue ) {
  myDatepickerForDateStart.selectDate( new Date( Date.parse(dateStart.defaultValue) ) );
}

let dateEnd = document.querySelector('#date-end');
let myDatepickerForDateEnd = $('#date-end').datepicker().data('datepicker');
if ( dateEnd.defaultValue ) {
  myDatepickerForDateEnd.selectDate( new Date( Date.parse(dateEnd.defaultValue) ) );
}

let dateFilter = document.querySelector('#date-filter');
let myDatepickerForFilter = $('#date-filter').datepicker().data('datepicker');
if ( dateFilter.defaultValue ) {
  myDatepickerForFilter.selectDate([
    new Date( Date.parse( dateFilter.defaultValue.slice(0, 10) ) ),
    new Date( Date.parse( dateFilter.defaultValue.slice(13) ) ) 
  ]);
}


// Spare Code
$('#date-start1').datepicker({ 
  onSelect: function (fd, d, picker) { 
    $("#date-start1").val(fd.split("-")[0]);
    $("#date-end1").val(fd.split("-")[1]);
  }
});

let dateStart1 = document.querySelector('#date-start1');
let myDatepickerForDateStart1 = $('#date-start1').datepicker().data('datepicker');
if ( dateStart1.defaultValue ) {
  myDatepickerForDateStart1.selectDate( new Date( Date.parse(dateStart1.defaultValue) ) );
}

let dateEnd1 = document.querySelector('#date-end1');
let myDatepickerForDateEnd1 = $('#date-end1').datepicker().data('datepicker');
if ( dateEnd1.defaultValue ) {
  myDatepickerForDateEnd1.selectDate( new Date( Date.parse(dateEnd1.defaultValue) ) );
}
// End Spare Code



