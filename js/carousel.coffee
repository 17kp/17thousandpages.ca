carouselItems = document.querySelectorAll('.carousel__item')
nextBtn = document.getElementById('carousel__next')
prevBtn = document.getElementById('carousel__prev')
outgoing = 0
incoming = 0

animationEndEvents = ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd']
clickEvents = ['click', 'touchend']

resetCurrent = (e) ->
  carouselItems[outgoing].setAttribute('data-state', '')

switchSlide = (direction) ->
  carouselItems[incoming].setAttribute('data-state', 'current')
  carouselItems[outgoing].setAttribute('data-state', "outgoing-to-#{ direction }")

addAnimationEndEvent = (elem) ->
  for animEvent in animationEndEvents
    elem.addEventListener(animEvent, resetCurrent, false)

addClickEvent = (elem, callback) ->
  for clickEvent in clickEvents
    elem.addEventListener(clickEvent, callback, false)

next = (e) ->
  e.preventDefault()
  outgoing = incoming
  incoming++

  if incoming > carouselItems.length - 1
    incoming = 0

  switchSlide('left')

prev = (e) ->
  e.preventDefault()
  outgoing = incoming
  incoming--

  if incoming < 0
    incoming = carouselItems.length - 1

  switchSlide('right')

if carouselItems && nextBtn && prevBtn
  for item in carouselItems
    addAnimationEndEvent(item)

  addClickEvent(nextBtn, next)
  addClickEvent(prevBtn, prev)
