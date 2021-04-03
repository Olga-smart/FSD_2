import './expandable-checklist.scss';

import '../checklist/checklist.js'

class ExpandableChecklist {
  
  constructor(component) {
    this._component = component;
    this._title = component.querySelector('.js-expandable-checklist__title');
    this._attachEventHandlers();
  }
  
  _attachEventHandlers() {
    this._title.addEventListener('click', (event) => {
      this._component.classList.toggle('expandable-checklist_open')
    });
  }
  
}

let expandableChecklists = document.querySelectorAll('.js-expandable-checklist');
for (let list of expandableChecklists) {
  new ExpandableChecklist(list);
}