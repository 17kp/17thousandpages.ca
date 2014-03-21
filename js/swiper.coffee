this.Swiper = (elem, callback) ->
  directions = {left : 'left', right : 'right'}
  returnObject = {target : elem, direction : directions.left}
  originalCoord = {x : 0, y : 0}
  finalCoord = {x : 0, y : 0}
  changeX = 0
  goingVertical = 0
  callbackTimeout = null

  touchStartHandler = (e) ->
    originalCoord.x = e.targetTouches[0].pageX
    originalCoord.y = e.targetTouches[0].pageY

    finalCoord.x = originalCoord.x
    finalCoord.y = originalCoord.y

    goingVertical = 0
    clearTimeout(callbackTimeout)

  touchMoveHandler = (e) ->
    finalCoord.x = e.targetTouches[0].pageX
    finalCoord.y = e.targetTouches[0].pageY

    if goingVertical is 0
      goingVertical = false

      if Math.abs(finalCoord.y - originalCoord.y) > Math.abs(finalCoord.x - originalCoord.x)
        goingVertical = true

    if goingVertical is false
      e.preventDefault()

  touchEndHandler = (e) ->
    changeX = originalCoord.x - finalCoord.x
    clearTimeout(callbackTimeout)
    timerCallback = () -> callback(returnObject)

    if goingVertical is false
      if changeX > 0
        # Timeout stops the callback being fired if the tablet catches a scroll first
        # Stops weird DOM freezing of iOS, they will then be triggered after scroll
        returnObject.direction = directions.left
      else
        returnObject.direction = directions.right

      callbackTimeout = setTimeout(timerCallback, 10)

    goingVertical = 0

  addSwipeListener = () ->
    elem.addEventListener('touchstart', touchStartHandler, false)
    elem.addEventListener('touchmove', touchMoveHandler, false)
    elem.addEventListener('touchend', touchEndHandler, false)

  removeSwipeListener = () ->
    elem.removeEventListener('touchstart', touchStartHandler)
    elem.removeEventListener('touchmove', touchMoveHandler)
    elem.removeEventListener('touchend', touchEndHandler)

  addSwipeListener()

  return {
    off : removeSwipeListener
    noSwiping : removeSwipeListener
    directions : directions
  }
