import initDateField from '../../libs/cleave/init';

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
    element.classList.toggle('input__field_dropdown_open');
    element.classList.toggle('input__field_focused');
  }

  _initFields(component) {
    this._component = component;

    if (component.querySelector('.js-input__field')) {
      this._input = component.querySelector('.js-input__field');

      if (this._input.classList.contains('js-input__field_date')) {
        initDateField(this._input);
      }
    }
  }
}

export default Input;
