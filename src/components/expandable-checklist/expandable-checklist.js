let expandableChecklistTitles = document.querySelectorAll('.js-expandable-checklist__title');

for (let title of expandableChecklistTitles) {
  title.addEventListener('click', function() {
    title.parentElement.classList.toggle('expandable-checklist_open')
  });
}