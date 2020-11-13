let likes = document.querySelectorAll('.like');
for (let like of likes) {
  like.addEventListener('click', function() {
    like.classList.toggle('checked');
    let value = +like.textContent;
    if ( like.classList.contains('checked') ) {
      like.textContent = ++value;
    } else {
      like.textContent = --value;
    }
  })
}