(function() {
  var backBtn, book, frontBtn;

  frontBtn = document.getElementById('btn-front');

  backBtn = document.getElementById('btn-back');

  book = document.querySelector('.book');

  if (book && frontBtn && backBtn) {
    frontBtn.addEventListener('click', function(e) {
      book.setAttribute('data-state', 'front');
      backBtn.setAttribute('data-state', '');
      return this.setAttribute('data-state', 'selected');
    });
    backBtn.addEventListener('click', function(e) {
      book.setAttribute('data-state', 'back');
      frontBtn.setAttribute('data-state', '');
      return this.setAttribute('data-state', 'selected');
    });
  }

}).call(this);
