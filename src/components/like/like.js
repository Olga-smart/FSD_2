import './like.scss';

class Like {
  
  constructor(component) {
    this._component = component;
    this._attachEventHandlers();
  }
  
  _attachEventHandlers() {
    this._component.addEventListener('click', function() {
      this.classList.toggle('like_checked');
      let value = +this.textContent;
      if ( this.classList.contains('like_checked') ) {
        this.textContent = ++value;
      } else {
        this.textContent = --value;
      }
    })
  }
}

let likes = document.querySelectorAll('.js-like');
for (let like of likes) {
  new Like(like);
}