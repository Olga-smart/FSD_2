class Like {
  constructor(component) {
    this._component = component;
    this._attachEventHandlers();
  }

  _handleClick(event) {
    const component = event.currentTarget;

    component.classList.toggle('like_checked');
    let value = Number(component.textContent);

    if (component.classList.contains('like_checked')) {
      value += 1;
      component.textContent = value;
    } else {
      value -= 1;
      component.textContent = value;
    }
  }

  _attachEventHandlers() {
    this._component.addEventListener('click', this._handleClick);
  }
}

export default Like;
