import 'air-datepicker';
import 'air-datepicker/dist/css/datepicker.min.css';

class Datepicker {
  constructor(component) {
    this._initFields(component);
    this._addApplyBtn();
    this._addStyleForBtns();

    if (this._component.defaultValue) {
      this._setDefaultDate();
    }

    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new Datepicker(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;

    const options = {
      clearButton: true,
      navTitles: {
        days: 'MM yyyy',
      },
      offset: 6,
      minDate: new Date(),
      language: {
        monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
      },
      range: true,
      multipleDatesSeparator: ' - ',
    };

    if (component.classList.contains('date-start')) {
      options.onSelect = (fd) => {
        $(component).val(fd.split(' - ')[0]);
        const dateEnd = component.parentElement.parentElement.nextElementSibling.querySelector('.date-end');
        $(dateEnd).val(fd.split(' - ')[1]);
      };
    }

    if (component.classList.contains('date-end')) {
      options.onSelect = (fd) => {
        const dateStart = component.parentElement.parentElement.previousElementSibling.querySelector('.date-start');
        $(dateStart).val(fd.split(' - ')[0]);
        $(component).val(fd.split(' - ')[1]);
      };
      options.position = 'bottom right';
    }

    $(component).datepicker(options);

    this._calendar = $(component).data('datepicker');
    [this._calendarElement] = this._calendar.$datepicker;
  }

  _addApplyBtn() {
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Применить';
    applyBtn.className = 'datepicker--button button';
    applyBtn.dataset.action = 'hide';

    const btnsContainer = this._calendarElement.querySelector('.datepicker--buttons');
    btnsContainer.append(applyBtn);
  }

  _addStyleForBtns() {
    const btns = this._calendarElement.querySelectorAll('.datepicker--button');
    [...btns].forEach((btn) => {
      btn.classList.add('button');
    });
  }

  _setDefaultDate() {
    if (this._component.defaultValue.includes(' - ')) {
      this._calendar.selectDate([
        new Date(Date.parse(this._component.defaultValue.slice(0, 10))),
        new Date(Date.parse(this._component.defaultValue.slice(13))),
      ]);
    } else {
      this._calendar.selectDate(new Date(Date.parse(this._component.defaultValue)));
    }
  }

  static _handleKeyDown(event) {
    event.preventDefault();
  }

  _attachEventHandlers() {
    this._component.addEventListener('keydown', Datepicker._handleKeyDown);
  }
}

export default Datepicker;
