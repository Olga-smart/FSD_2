import './like.scss';

class Like {
  constructor(component) {
    this._component = component;
    this._attachEventHandlers();
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new Like(element));
    });

    return arr;
  }

  static _handleClick(event) {
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
    this._component.addEventListener('click', Like._handleClick);
  }
}

const likes = document.querySelectorAll('.js-like');
Like.init(likes);
