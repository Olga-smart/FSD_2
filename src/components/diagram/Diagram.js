import wordToPlural from '../../helpers/wordToPlural/wordToPlural';

class Diagram {
  constructor(component) {
    this._initFields(component);
    this._updateVotesWord();
  }

  _initFields(component) {
    this._component = component;
    this._votesElement = component.querySelector('.js-diagram__votes');
    this._votesNumber = this._votesElement.textContent;
  }

  _updateVotesWord() {
    this._votesElement.dataset.word = wordToPlural(this._votesNumber, 'голос', 'голоса', 'голосов');
  }
}

export default Diagram;
