(function() {
  var prev = document.querySelector('#previous');
  var next = document.querySelector('#next');
  var gallery = document.querySelector('#gallery-wrap');
  var pages = Math.round(gallery.scrollHeight/gallery.clientHeight) - 1 || Math.round(gallery.scrollWidth/gallery.clientWidth) - 1;
  var VERTICAL = 'Y';
  var HORISONTAL = 'X';
  var lastDirection;
  var direction;
  var page = 0;

  gallery.classList.add('js');

  resize();
  setButtons(page);

  window.onresize = throttle(resize,300);


  prev.addEventListener('click', function() {
    page += page !== 0 ? -1 : 0;
    scroll();
  });

  next.addEventListener('click', function() {
    page += pages > page ? 1 : 0;
    scroll();
  });

  /**
   * Пролистывание галереи.
   */
  function scroll() {
    gallery.style.transform = 'translate' + direction +'(' + -page * 100 + '%)';
    setButtons();
  }

  /**
   * Настройка отображения кнопок.
   */
  function setButtons() {
    prev.classList.toggle('hidden', page === 0);
    next.classList.toggle('hidden', page === pages);
  }

  /**
   * Изменение размеров viewport.
   */
  function resize() {
    direction = window.innerWidth >= 600 ? VERTICAL : HORISONTAL;

    if (direction !== lastDirection) {
      page = 0;
      scroll(page);
      if (direction === VERTICAL) {
        pages = Math.round(gallery.scrollHeight/gallery.clientHeight) - 1;
      } else {
        pages = Math.round(gallery.scrollWidth/gallery.clientWidth) - 1;
      }
    }
    lastDirection = direction;
  }

  /**
   * Throttle
   * @param  {function} callback  Функция которую нужно оптимизировать
   * @param  {number} timeDelay   Кол-во миллисекунд вызова функции
   * @return {function}           Оптимизированная функция
   */
  function throttle(callback, timeDelay) {
    var lastCall = Date.now();
    return function() {
      if (Date.now() - lastCall >= timeDelay) {
        callback();
        lastCall = Date.now();
      }
    };
  }
})();





