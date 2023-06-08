import Like from './Like';

const likes = document.querySelectorAll('.js-like');
[...likes].forEach((like) => new Like(like));
