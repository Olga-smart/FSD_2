import '../like/init';
import Comment from './Сomment';

const comments = document.querySelectorAll('.js-comment');
[...comments].forEach((comment) => new Comment(comment));
