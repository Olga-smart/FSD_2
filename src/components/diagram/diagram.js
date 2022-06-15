import wordToPlural from '../../helpers/wordToPlural/wordToPlural';

class Diagram {
  constructor(component) {
    this._initFields(component);
    this._updateVotesWord();
  }

  static init(elements) {
    const arr = [];

    [...elements].forEach((element) => {
      arr.push(new Diagram(element));
    });

    return arr;
  }

  _initFields(component) {
    this._component = component;
    this._votesWordElement = component.querySelector('.js-diagram__votes-word');
    this._votesNumber = component.querySelector('.js-diagram__votes-number').textContent;
  }

  _updateVotesWord() {
    this._votesWordElement.textContent = wordToPlural(this._votesNumber, 'голос', 'голоса', 'голосов');
  }
}

export default Diagram;
