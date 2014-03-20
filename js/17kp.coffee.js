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
  var addAnimationEndEvent, animationEndEvents, carouselItems, incoming, item, next, nextBtn, outgoing, prev, prevBtn, resetCurrent, switchSlide, _i, _len;

  carouselItems = document.querySelectorAll('.carousel__item');

  nextBtn = document.getElementById('carousel__next');

  prevBtn = document.getElementById('carousel__prev');

  outgoing = 0;

  incoming = 0;

  animationEndEvents = ['animationend', 'webkitAnimationEnd', 'oanimationend', 'MSAnimationEnd'];

  resetCurrent = function(e) {
    carouselItems[outgoing].setAttribute('data-state', '');
    return carouselItems[incoming].setAttribute('data-state', 'current');
  };

  switchSlide = function(item, direction) {
    return carouselItems[item].setAttribute('data-state', "incoming-" + direction);
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

  next = function(e) {
    outgoing = incoming;
    incoming++;
    if (incoming > carouselItems.length - 1) {
      incoming = 0;
    }
    return switchSlide(incoming, 'right');
  };

  prev = function(e) {
    outgoing = incoming;
    incoming--;
    if (incoming < 0) {
      incoming = carouselItems.length - 1;
    }
    return switchSlide(incoming, 'left');
  };

  if (carouselItems && nextBtn && prevBtn) {
    for (_i = 0, _len = carouselItems.length; _i < _len; _i++) {
      item = carouselItems[_i];
      addAnimationEndEvent(item);
    }
    nextBtn.addEventListener('click', next, false);
    prevBtn.addEventListener('click', prev, false);
  }

}).call(this);
