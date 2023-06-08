import Input from './Input';

const inputs = document.querySelectorAll('.js-input');
[...inputs].forEach((input) => new Input(input));
