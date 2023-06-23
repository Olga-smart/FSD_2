class Input {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  setValue(value) {
    this._input.value = value;
  }

  getValue() {
    return this._input.value;
  }

  addFlatBottom() {
    this._input.classList.add('input__field_bottom_flat');
  }

  removeFlatBottom() {
    this._input.classList.remove('input__field_bottom_flat');
  }

  addFocusStyle() {
    this._input.classList.add('input__field_focused');
  }

  removeFocusStyle() {
    this._input.classList.remove('input__field_focused');
  }

  _initFields(component) {
    this._component = component;
    this._input = component.querySelector('.js-input__field');
  }

  _attachEventHandlers() {
    this._input.addEventListener('input', this._handleValueChange.bind(this));
  }

  _handleValueChange() {
    if (this.onChange) {
      this.onChange(this._input.value);
    }
  }
}

export default Input;
