require('air-datepicker');
require('air-datepicker/dist/css/datepicker.min.css');

import './datepicker.scss';
import '../input/input.js';

class Datepicker {
  
  constructor(component) {
    this._component = component;
    
    let options = {
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
    }
    
    if (component.classList.contains('date-start')) {
      options.onSelect = function(fd, d, picker) {
        $(component).val(fd.split(" - ")[0]);
        let dateEnd = component.parentElement.parentElement.nextElementSibling.querySelector('.date-end');
        $(dateEnd).val(fd.split(" - ")[1]);
      };
    }
    
    if (component.classList.contains('date-end')) {
      options.onSelect = function(fd, d, picker) {
        let dateStart = component.parentElement.parentElement.previousElementSibling.querySelector('.date-start');
        $(dateStart).val(fd.split(" - ")[0]);
        $(component).val(fd.split(" - ")[1]);
      };
      options.position = "bottom right";
    }
    
    $(component).datepicker(options);
    
    this._calendar = $(component).data('datepicker');
    this._calendarElement = this._calendar.$datepicker[0];
    
    this._addApplyBtn();
    this._addStyleForBtns();
    
    if (this._component.defaultValue) {
      this._setDefaultDate()
    }
    
    this._attachEventHandlers();  
  } 
  
  _addApplyBtn() {
    let applyBtn = document.createElement('button');
    applyBtn.textContent = 'Применить';
    applyBtn.className = 'datepicker--button button';
    applyBtn.dataset.action = 'hide';
    
    let btnsContainer = this._calendarElement.querySelector('.datepicker--buttons');
    btnsContainer.append(applyBtn);
  }
  
  _addStyleForBtns() {
    let btns = this._calendarElement.querySelectorAll('.datepicker--button');
    for (let btn of btns) {
      btn.classList.add('button');
    }
  }
  
  _setDefaultDate() {
    if (this._component.defaultValue.includes(' - ')) {
      this._calendar.selectDate([
        new Date( Date.parse( this._component.defaultValue.slice(0, 10) ) ),
        new Date( Date.parse( this._component.defaultValue.slice(13) ) )
      ]);
    } else {
      this._calendar.selectDate( new Date( Date.parse(this._component.defaultValue) ) );
    }
  }
  
  _attachEventHandlers() {
    this._component.addEventListener('keydown', function(e) {
      e.preventDefault();
    });
  }
  
}

let datepickers = document.querySelectorAll('.datepicker-here');
for (let datepicker of datepickers) {
  new Datepicker(datepicker);
}











