class AirDatepicker {
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
      arr.push(new AirDatepicker(element));
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
      onSelect(fd, d) {
        component.dispatchEvent(new CustomEvent('input', {
          detail: {
            date: d,
            formattedDate: fd,
          },
        }));
      },
    };

    if (component.classList.contains('date-start')) {
      options.onSelect = (fd, d) => {
        $(component).val(fd.split(' - ')[0]);

        const dateEnd = component.parentElement.parentElement.nextElementSibling.querySelector('.date-end');
        $(dateEnd).val(fd.split(' - ')[1]);

        if (d[0] && d[1]) {
          this._component.dispatchEvent(new Event('input'));
          dateEnd.dispatchEvent(new Event('input'));
        }
      };
    }

    if (component.classList.contains('date-end')) {
      options.onSelect = (fd, d) => {
        const dateStart = component.parentElement.parentElement.previousElementSibling.querySelector('.date-start');
        $(dateStart).val(fd.split(' - ')[0]);

        $(component).val(fd.split(' - ')[1]);

        if (d[0] && d[1]) {
          dateStart.dispatchEvent(new Event('input'));
          this._component.dispatchEvent(new Event('input'));
        }
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

  _handleInput(event) {
    if (this._component.classList.contains('date-start') || this._component.classList.contains('date-end')) {
      const [day, month, year] = $(this._component).val().split('.');
      $(this._component).attr('value', `${year}-${month}-${day}`);
    } else if (Array.isArray(event.detail.date)) {
      const startDate = AirDatepicker._formatDateForValueAttribute(event.detail.date[0]);
      const endDate = AirDatepicker._formatDateForValueAttribute(event.detail.date[1]);
      $(this._component).attr('value', `${startDate} - ${endDate}`);
    } else {
      const date = AirDatepicker._formatDateForValueAttribute(event.detail.date);
      $(this._component).attr('value', date);
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
    this._component.addEventListener('keydown', AirDatepicker._handleKeyDown);
    this._component.addEventListener('input', this._handleInput.bind(this));
  }
}

export default AirDatepicker;
