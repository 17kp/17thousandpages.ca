(function() {
  this.Swiper = function(elem, callback) {
    var addSwipeListener, callbackTimeout, changeX, directions, finalCoord, goingVertical, originalCoord, removeSwipeListener, returnObject, touchEndHandler, touchMoveHandler, touchStartHandler;
    directions = {
      left: 'left',
      right: 'right'
    };
    returnObject = {
      target: elem,
      direction: directions.left
    };
    originalCoord = {
      x: 0,
      y: 0
    };
    finalCoord = {
      x: 0,
      y: 0
    };
    changeX = 0;
    goingVertical = 0;
    callbackTimeout = null;
    touchStartHandler = function(e) {
      originalCoord.x = e.targetTouches[0].pageX;
      originalCoord.y = e.targetTouches[0].pageY;
      finalCoord.x = originalCoord.x;
      finalCoord.y = originalCoord.y;
      goingVertical = 0;
      return clearTimeout(callbackTimeout);
    };
    touchMoveHandler = function(e) {
      finalCoord.x = e.targetTouches[0].pageX;
      finalCoord.y = e.targetTouches[0].pageY;
      if (goingVertical === 0) {
        goingVertical = false;
        if (Math.abs(finalCoord.y - originalCoord.y) > Math.abs(finalCoord.x - originalCoord.x)) {
          goingVertical = true;
        }
      }
      if (goingVertical === false) {
        return e.preventDefault();
      }
    };
    touchEndHandler = function(e) {
      var timerCallback;
      changeX = originalCoord.x - finalCoord.x;
      clearTimeout(callbackTimeout);
      timerCallback = function() {
        return callback(returnObject);
      };
      if (goingVertical === false) {
        if (changeX > 0) {
          returnObject.direction = directions.left;
        } else {
          returnObject.direction = directions.right;
        }
        callbackTimeout = setTimeout(timerCallback, 10);
      }
      return goingVertical = 0;
    };
    addSwipeListener = function() {
      elem.addEventListener('touchstart', touchStartHandler, false);
      elem.addEventListener('touchmove', touchMoveHandler, false);
      return elem.addEventListener('touchend', touchEndHandler, false);
    };
    removeSwipeListener = function() {
      elem.removeEventListener('touchstart', touchStartHandler);
      elem.removeEventListener('touchmove', touchMoveHandler);
      return elem.removeEventListener('touchend', touchEndHandler);
    };
    addSwipeListener();
    return {
      off: removeSwipeListener,
      noSwiping: removeSwipeListener,
      directions: directions
    };
  };

}).call(this);

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

(function() {
  var addAnimationEndEvent, addClickEvent, addSwipeEvent, animationEndEvents, carouselButtons, carouselItems, clickEvents, incoming, item, next, nextBtn, outgoing, prev, prevBtn, resetCurrent, switchSlide, _i, _len;

  carouselItems = document.querySelectorAll('.carousel__item');

  carouselButtons = document.querySelector('.carousel__buttons');

  nextBtn = document.getElementById('carousel__next');

  prevBtn = document.getElementById('carousel__prev');

  outgoing = 0;

  incoming = 0;

  animationEndEvents = ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd'];

  clickEvents = ['click', 'touchend'];

  resetCurrent = function(e) {
    return carouselItems[outgoing].setAttribute('data-state', '');
  };

  switchSlide = function(direction) {
    carouselItems[incoming].setAttribute('data-state', 'current');
    return carouselItems[outgoing].setAttribute('data-state', "outgoing-to-" + direction);
  };

  addAnimationEndEvent = function(elem) {
    var animEvent, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = animationEndEvents.length; _i < _len; _i++) {
      animEvent = animationEndEvents[_i];
      _results.push(elem.addEventListener(animEvent, resetCurrent, false));
    }
    return _results;
  };

  addSwipeEvent = function(elem) {
    var swiper;
    return swiper = new Swiper(elem, function(e) {
      if (e.direction === 'left') {
        return next();
      } else {
        return prev();
      }
    });
  };

  addClickEvent = function(elem, callback) {
    var clickEvent, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = clickEvents.length; _i < _len; _i++) {
      clickEvent = clickEvents[_i];
      _results.push(elem.addEventListener(clickEvent, callback, false));
    }
    return _results;
  };

  next = function(e) {
    if (e) {
      e.preventDefault();
    }
    outgoing = incoming;
    incoming++;
    if (incoming > carouselItems.length - 1) {
      incoming = 0;
    }
    return switchSlide('left');
  };

  prev = function(e) {
    if (e) {
      e.preventDefault();
    }
    outgoing = incoming;
    incoming--;
    if (incoming < 0) {
      incoming = carouselItems.length - 1;
    }
    return switchSlide('right');
  };

  if (carouselItems && nextBtn && prevBtn) {
    for (_i = 0, _len = carouselItems.length; _i < _len; _i++) {
      item = carouselItems[_i];
      addAnimationEndEvent(item);
    }
    addSwipeEvent(carouselButtons);
    addClickEvent(nextBtn, next);
    addClickEvent(prevBtn, prev);
  }

}).call(this);
