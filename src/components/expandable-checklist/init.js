import '../checklist/checklist';
import ExpandableChecklist from './ExpandableChecklist';
import './expandable-checklist.scss';

const lists = document.querySelectorAll('.js-expandable-checklist');
ExpandableChecklist.init(lists);
