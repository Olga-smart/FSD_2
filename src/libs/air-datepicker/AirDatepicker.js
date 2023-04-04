class AirDatepicker {
  constructor(component) {
    this._initFields(component);
    this._addClassToInput();
    this._addApplyButton();
    this._addStyleForButtons();

    if (this._input.defaultValue) {
      this._setDefaultDate();
    }

    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new AirDatepicker(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._input = component.querySelector('input');

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
      onSelect: (fd, d) => {
        this._input.dispatchEvent(new CustomEvent('input', {
          detail: {
            date: d,
            formattedDate: fd,
          },
        }));
      },
    };

    if (component.classList.contains('js-calendar_start')) {
      options.onSelect = (fd, d) => {
        const dateEnd = document.getElementById(this._input.dataset.relatedInput);

        if (dateEnd) {
          $(this._input).val(fd.split(' - ')[0]);
          $(dateEnd).val(fd.split(' - ')[1]);

          if (d[0] && d[1]) {
            this._input.dispatchEvent(new Event('input'));
            dateEnd.dispatchEvent(new Event('input'));
          }
        }
      };
    }

    if (component.classList.contains('js-calendar_end')) {
      options.onSelect = (fd, d) => {
        const dateStart = document.getElementById(this._input.dataset.relatedInput);

        if (dateStart) {
          $(dateStart).val(fd.split(' - ')[0]);
          $(this._input).val(fd.split(' - ')[1]);

          if (d[0] && d[1]) {
            dateStart.dispatchEvent(new Event('input'));
            this._input.dispatchEvent(new Event('input'));
          }
        }
      };
      options.position = 'bottom right';
    }

    $(this._input).datepicker(options);

    this._calendar = $(this._input).data('datepicker');
    [this._calendarElement] = this._calendar.$datepicker;
  }

  _addClassToInput() {
    // this class is required for calendar to work correctly with 2 inputs
    this._input.classList.add('datepicker-here');
  }

  _addApplyButton() {
    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Применить';
    applyBtn.className = 'datepicker--button button';
    applyBtn.dataset.action = 'hide';

    const btnsContainer = this._calendarElement.querySelector('.datepicker--buttons');
    btnsContainer.append(applyBtn);
  }

  _addStyleForButtons() {
    const buttons = this._calendarElement.querySelectorAll('.datepicker--button');
    [...buttons].forEach((button) => {
      button.classList.add('button');
    });
  }

  _setDefaultDate() {
    if (this._input.defaultValue.includes(' - ')) {
      this._calendar.selectDate([
        new Date(Date.parse(this._input.defaultValue.slice(0, 10))),
        new Date(Date.parse(this._input.defaultValue.slice(13))),
      ]);
    } else {
      this._calendar.selectDate(new Date(Date.parse(this._input.defaultValue)));
    }
  }

  _handleInput(event) {
    if (this._component.classList.contains('js-calendar_start') || this._component.classList.contains('js-calendar_end')) {
      const [day, month, year] = $(this._input).val().split('.');
      $(this._input).attr('value', `${year}-${month}-${day}`);
    } else if (Array.isArray(event.detail.date)) {
      const startDate = AirDatepicker._formatDateForValueAttribute(event.detail.date[0]);
      const endDate = AirDatepicker._formatDateForValueAttribute(event.detail.date[1]);
      $(this._input).attr('value', `${startDate} - ${endDate}`);
    } else {
      const date = AirDatepicker._formatDateForValueAttribute(event.detail.date);
      $(this._input).attr('value', date);
    }
  }

  static _formatDateForValueAttribute(date) {
    let formattedDate = new Date(date);
    formattedDate = new Date(formattedDate.getTime()
                  - (formattedDate.getTimezoneOffset() * 60 * 1000));
    [formattedDate] = formattedDate.toISOString().split('T');

    return formattedDate;
  }

  static _handleKeyDown(event) {
    event.preventDefault();
  }

  _attachEventHandlers() {
    this._input.addEventListener('keydown', AirDatepicker._handleKeyDown);
    this._input.addEventListener('input', this._handleInput.bind(this));
  }
}

export default AirDatepicker;
