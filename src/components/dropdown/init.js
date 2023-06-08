import Dropdown from './Dropdown';

const dropdowns = document.querySelectorAll('.js-dropdown');
[...dropdowns].forEach((dropdown) => new Dropdown(dropdown));
