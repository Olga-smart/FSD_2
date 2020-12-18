let likes = document.querySelectorAll('.js-like');
for (let like of likes) {
  like.addEventListener('click', function() {
    like.classList.toggle('like_checked');
    let value = +like.textContent;
    if ( like.classList.contains('like_checked') ) {
      like.textContent = ++value;
    } else {
      like.textContent = --value;
    }
  })
}