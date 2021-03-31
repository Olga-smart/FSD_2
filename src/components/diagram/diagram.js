import './diagram.scss';
import {wordToPlural} from '../word-to-plural/word-to-plural.js'

class Diagram {
  
  constructor(component) {
    this._component = component;
    
    this._votesWordElement = component.querySelector('.js-diagram__votes-word');
    this._votesNumber = component.querySelector('.js-diagram__votes-number').textContent;
    
    this._updateVotesWord();
  }
  
  _updateVotesWord() {
    this._votesWordElement.textContent = wordToPlural(this._votesNumber, 'голос', 'голоса', 'голосов');
  }
  
}

let diagrams = document.querySelectorAll('.diagram');
for (let diagram of diagrams) {
  new Diagram(diagram);
}