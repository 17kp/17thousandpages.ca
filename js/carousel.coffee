carouselItems = document.querySelectorAll('.carousel__item')
nextBtn = document.getElementById('carousel__next')
prevBtn = document.getElementById('carousel__prev')
outgoing = 0
incoming = 0

animationEndEvents = ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd']

resetCurrent = (e) ->
  carouselItems[outgoing].setAttribute('data-state', '')
  carouselItems[incoming].setAttribute('data-state', 'current')

switchSlide = (item, direction) ->
  carouselItems[item].setAttribute('data-state', "incoming-#{ direction }")

addAnimationEndEvent = (elem) ->
  for animEvent in animationEndEvents
    elem.addEventListener(animEvent, resetCurrent, false)

next = (e) ->
  outgoing = incoming
  incoming++

  if incoming > carouselItems.length - 1
    incoming = 0

  switchSlide(incoming, 'right')

prev = (e) ->
  outgoing = incoming
  incoming--

  if incoming < 0
    incoming = carouselItems.length - 1

  switchSlide(incoming, 'left')

if carouselItems && nextBtn && prevBtn
  for item in carouselItems
    addAnimationEndEvent(item)

  nextBtn.addEventListener('click', next, false)
  prevBtn.addEventListener('click', prev, false)
