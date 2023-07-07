class Like {
  constructor(component) {
    this._component = component;
    this._attachEventHandlers();
  }

  _handleClick(event) {
    const component = event.currentTarget;
    component.classList.toggle('like_checked');
    const value = Number(component.textContent);
    const newValue = component.classList.contains('like_checked') ? value + 1 : value - 1;
    component.textContent = newValue;
  }

  _attachEventHandlers() {
    this._component.addEventListener('click', this._handleClick);
  }
}

export default Like;
