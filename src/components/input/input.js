/* eslint-disable no-new */
// Because this is third party plugin
import Cleave from 'cleave.js';

class Input {
  constructor(component) {
    this._initFields(component);
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new Input(element));
    });

    return arr;
  }

  static handleDropdownToggle(element) {
    element.classList.toggle('input__input_dropdown_open');
    element.classList.toggle('input__input_focused');
  }

  _initFields(component) {
    this._component = component;

    if (component.querySelector('.js-input__field')) {
      this._input = component.querySelector('.js-input__field');

      if (this._input.classList.contains('js-input__field_date')) {
        new Cleave(this._input, {
          date: true,
          delimiter: '.',
          datePattern: ['d', 'm', 'Y'],
        });
      }
    }
  }
}

export default Input;
