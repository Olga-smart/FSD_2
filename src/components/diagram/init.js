import Diagram from './Diagram';

const diagrams = document.querySelectorAll('.diagram');
[...diagrams].forEach((diagram) => new Diagram(diagram));
