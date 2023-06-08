import '../checklist/init';
import ExpandableChecklist from './ExpandableChecklist';

const lists = document.querySelectorAll('.js-expandable-checklist');
[...lists].forEach((list) => new ExpandableChecklist(list));
