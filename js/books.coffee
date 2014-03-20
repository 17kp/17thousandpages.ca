frontBtn = document.getElementById('btn-front')
backBtn = document.getElementById('btn-back')
book = document.querySelector('.book')

if book && frontBtn && backBtn

  frontBtn.addEventListener 'click', (e) ->
    book.setAttribute('data-state', 'front')
    backBtn.setAttribute('data-state', '')
    this.setAttribute('data-state', 'selected')

  backBtn.addEventListener 'click', (e) ->
    book.setAttribute('data-state', 'back')
    frontBtn.setAttribute('data-state', '')
    this.setAttribute('data-state', 'selected')
