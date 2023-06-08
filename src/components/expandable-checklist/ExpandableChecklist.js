class ExpandableChecklist {
  constructor(component) {
    this._initFields(component);
    this._attachEventHandlers();
  }

  _initFields(component) {
    this._component = component;
    this._title = component.querySelector('.js-expandable-checklist__title');
  }

  _handleTitleClick() {
    this._component.classList.toggle('expandable-checklist_open');
  }

  _attachEventHandlers() {
    this._title.addEventListener('click', this._handleTitleClick.bind(this));
  }
}

export default ExpandableChecklist;
