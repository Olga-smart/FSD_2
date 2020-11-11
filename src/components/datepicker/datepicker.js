require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

$('.datepicker-here').datepicker({
  clearButton: true,
  navTitles: {
    days: 'MM yyyy'
  },
  offset: 6
})

let calendars = document.querySelectorAll('.datepicker');
for (let calendar of calendars) {
  addStyleForBtns(calendar);
  addApplyBtn(calendar);
  setWidthForCalendar(calendar);
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



