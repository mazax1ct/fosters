//отслеживание скролла для шапки
var header = $('.header'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > $('.header').height() * 2) {
		header.addClass('is-scrolled');
	} else {
		header.removeClass('is-scrolled');
	}

  if ( scrolled > $('.header').height() && scrolled > scrollPrev ) {
		header.addClass('is-out');
	} else {
		header.removeClass('is-out');
	}

	scrollPrev = scrolled;
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //кастомный селект
  $('.js-select').each(function() {
    var $p = $(this).closest('.select-wrapper');
    $(this).select2({
      minimumResultsForSearch: Infinity,
      dropdownPosition: 'below',
      dropdownParent: $p,
    });
	}).on("select2:open", function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.addClass('open');
	}).on("select2:close", function (e) {
    var $p = $(this).closest('.select-wrapper');
    $p.removeClass('open');
	});

  if($('#before-after-slider').length) {
    const slider = document.getElementById('before-after-slider');
    const before = document.getElementById('before-image');
    const beforeImage = before.getElementsByTagName('img')[0];
    const resizer = document.getElementById('resizer');

    let active = false;

    //Sort overflow out for Overlay Image
    document.addEventListener("DOMContentLoaded", function() {
      let width = slider.offsetWidth;
      console.log(width);
      beforeImage.style.width = width + 'px';
    });

    //Adjust width of image on resize
    window.addEventListener('resize', function() {
      let width = slider.offsetWidth;
      console.log(width);
      beforeImage.style.width = width + 'px';
    })

    resizer.addEventListener('mousedown',function(){
      active = true;
     resizer.classList.add('resize');

    });

    document.body.addEventListener('mouseup',function(){
      active = false;
     resizer.classList.remove('resize');
    });

    document.body.addEventListener('mouseleave', function() {
      active = false;
      resizer.classList.remove('resize');
    });

    document.body.addEventListener('mousemove',function(e){
      if (!active) return;
      let x = e.pageX;
      x -= slider.getBoundingClientRect().left;
      slideIt(x);
      pauseEvent(e);
    });

    resizer.addEventListener('touchstart',function(){
      active = true;
      resizer.classList.add('resize');
    });

    document.body.addEventListener('touchend',function(){
      active = false;
      resizer.classList.remove('resize');
    });

    document.body.addEventListener('touchcancel',function(){
      active = false;
      resizer.classList.remove('resize');
    });

    //calculation for dragging on touch devices
    document.body.addEventListener('touchmove',function(e){
      if (!active) return;
      let x;

      let i;
      for (i=0; i < e.changedTouches.length; i++) {
      x = e.changedTouches[i].pageX;
      }

      x -= slider.getBoundingClientRect().left;
      slideIt(x);
      pauseEvent(e);
    });

    function slideIt(x){
        let transform = Math.max(0,(Math.min(x,slider.offsetWidth)));
        before.style.width = transform+"px";
        resizer.style.left = transform-0+"px";
    }

    //stop divs being selected.
    function pauseEvent(e){
        if(e.stopPropagation) e.stopPropagation();
        if(e.preventDefault) e.preventDefault();
        e.cancelBubble=true;
        e.returnValue=false;
        return false;
    }
  }
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//тогглер цветовой схемы
$(document).on('click', '.js-theme-toggler', function () {
  $('body').toggleClass('dark-theme');
  return false;
});

//тогглер главного меню
$(document).on('click', '.js-main-menu-toggler', function () {
  if($(this).hasClass('is-active')){
    $('body').removeClass('is-overflow');
    $('.main-menu').removeClass('is-open');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#burger');
    $(this).attr('title', 'Открыть меню');
    $(this).removeClass('is-active');
  }else{
    $('body').addClass('is-overflow');
    $('.main-menu').addClass('is-open');
    $(this).find('use').attr('xlink:href', 'images/sprite.svg#close');
    $(this).attr('title', 'Закрыть меню');
    $(this).addClass('is-active');
  }

  return false;
});

//тогглер меню в футере
$(document).on('click', '.js-footer-menu-toggler', function () {
  $(this).closest('.footer__menu-title').toggleClass('is-active');
  $(this).closest('.footer__menu-section').find('.footer__menu-list').slideToggle();
  return false;
});

//аккордеон
$(document).on('click', '.js-accordion-toggler', function () {
  $(this).toggleClass('is-active');
  $(this).closest('.accordion').find('.accordion__body:first').slideToggle();
  return false;
});

//обычный слайдер
if($('.js-slider').length) {
  $('.js-slider').each(function(index) {
    var slider = new Swiper($(this)[0], {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        el: '.js-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//слайдер периферии
if($('.js-accessories').length) {
  if($('body').width() < 768) {
    const accessoriesSlider = new Swiper('.js-accessories', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        el: '.js-accessories-navigation',
      },
      navigation: {
        nextEl: '.js-accessories-next',
        prevEl: '.js-accessories-prev',
      }
    });
  }
}

//слайдер видео отзывов
if($('.js-video-reviews').length) {
  const videoReviewsSlider = new Swiper('.js-video-reviews', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      },
    },
    pagination: {
      clickable: true,
      el: '.js-video-reviews-navigation',
    },
    navigation: {
      nextEl: '.js-video-reviews-next',
      prevEl: '.js-video-reviews-prev',
    }
  });
}

//слайдер отзывов
if($('.js-reviews').length) {
  const reviewsSlider = new Swiper('.js-reviews', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    watchSlidesProgress: true,
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20
      },
    },
    pagination: {
      clickable: true,
      el: '.js-reviews-navigation',
    },
    navigation: {
      nextEl: '.js-reviews-next',
      prevEl: '.js-reviews-prev',
    }
  });
}

//аккордеон блока наше производство
$(document).on('click', '.produce-item', function () {
  var h = 80;
  if($('body').width() > 1900){
    h = 140;
  }
  if(!$(this).hasClass('is-open')) {
    $('.produce-item.is-open').animate({height: h}, 500, function () {
      $(this).removeClass('is-open');
    });

    $(this).animate({height: $(this).prop('scrollHeight') + parseInt($(this).css('padding-top'))}, 500, function () {
      $(this).addClass('is-open');
    });
  }
  return false;
});

//табы
$(document).on('click', '.js-tabs-button', function () {
  $(this).closest('.tabs').find('.js-tabs-button.is-active').removeClass('is-active');
  $(this).addClass('is-active');

  $(this).closest('.tabs').find('.tab.is-active').removeClass('is-active');
  $(this).closest('.tabs').find('.tab[data-target="'+ $(this).attr('data-target') +'"]').addClass('is-active');
  return false;
});

//слайдер изображений серии
if($('.js-series').length) {
  $('.js-series').each(function(index) {
    var seriesImagesSlider = new Swiper($(this)[0], {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        el: '.js-series-navigation[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//слайдер карточек готовых компов
if($('.js-cards-slider').length) {
  $('.js-cards-slider').each(function(index) {
    var cardsSlider = new Swiper($(this)[0], {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20
        }
      },
      pagination: {
        clickable: true,
        el: '.js-cards-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-cards-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-cards-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//табы конфигураций
$(document).on('click', '.js-conf-compare', function () {
  $('.js-conf-compare').removeClass('is-active');
  $(this).addClass('is-active');
  $('.conf-compare__tab').removeClass('is-active');
  $('.conf-compare__tab[data-target="'+ $(this).attr('data-target') +'"]').addClass('is-active');
  return false;
});

//открытие блока производительности
$(document).on('click', '.js-perf-opener', function () {
  $('.config').addClass('perf-open');
  $('.perf').slideToggle();
  return false;
});

//закрытие блока производительности
$(document).on('click', '.js-perf-closer', function () {
  $('.perf').slideToggle(function() {
    $('.config').removeClass('perf-open');
  });
  return false;
});

//табы комплектов
$(document).on('click', '.js-complects-tab', function () {
  $('.js-complects-tab').removeClass('is-active');
  $(this).addClass('is-active');
  $('.complects__tab').removeClass('is-active');
  $('.complects__tab[data-target="'+ $(this).attr('data-target') +'"]').addClass('is-active');
  return false;
});

//аккордеон компонентов
$(document).on('click', '.js-component-toggler', function () {
  if(!$(this).hasClass('is-active')){
    $(this).closest('.components').find('.accordion__body').slideUp();
    $(this).closest('.components').find('.js-component-toggler').removeClass('is-active');
    $(this).closest('.components').find('.component-image').slideUp();

    $(this).addClass('is-active');
    $(this).closest('.accordion').find('.accordion__body').slideDown();
    $(this).closest('.components').find('.component-image[data-target="'+ $(this).attr("data-target") +'"]').slideDown();
  }else{
    $(this).removeClass('is-active');
    $(this).closest('.accordion').find('.accordion__body').slideUp();
    $(this).closest('.components').find('.component-image').slideUp();
  }

  return false;
});

//слайдер fps карточек
if($('.js-fps-slider').length) {
  $('.js-fps-slider').each(function(index) {
    var fpsCardsSlider = new Swiper($(this)[0], {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20
        }
      },
      pagination: {
        clickable: true,
        el: '.js-fps-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-fps-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-fps-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//слайдер карточек готовых компов
if($('.js-recs-slider').length) {
  $('.js-recs-slider').each(function(index) {
    var recsSlider = new Swiper($(this)[0], {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 20
        }
      },
      pagination: {
        clickable: true,
        el: '.js-recs-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-recs-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-recs-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//слайдер fps графиков
if($('.js-fps-slider-2').length) {
  $('.js-fps-slider-2').each(function(index) {
    var fpsCardsSlider2 = new Swiper($(this)[0], {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        clickable: true,
        el: '.js-fps-slider-2-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-fps-slider-2-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-fps-slider-2-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

const seriesSlider = new Swiper('.js-series-slider', {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopAdditionalSlides: 1,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 3,
        initialSlide: 4,
        slideShadows: false
    },
    breakpoints: {
        1500: {
            coverflowEffect: {
                modifier: 5,
                depth: 190
            },
        }
    },
    navigation: {
      nextEl: '.js-series-slider-next',
      prevEl: '.js-series-slider-prev',
    }
});

//аккордеон компонентов в конфиге
$(document).on('click', '.js-config-component-toggler', function () {
  if(!$(this).hasClass('is-active')){
    $(this).closest('.js-config-components').find('.accordion__body').slideUp();
    $(this).closest('.js-config-components').find('.js-config-component-toggler').removeClass('is-active');

    $(this).addClass('is-active');
    $(this).closest('.accordion').find('.accordion__body').slideDown();

    $('.js-config-image').attr('src', $(this).attr('data-image'));
  }else{
    $(this).removeClass('is-active');
    $(this).closest('.accordion').find('.accordion__body').slideUp();
  }

  return false;
});

//поповер фпс на карточках конфигураций
$(document).on('click', '.js-card-fps-opener', function () {
  $(this).closest('.card').find('.card__fps-block').toggle();
  return false;
});

//открытие фильтра
$(document).on('click', '.js-filter-opener', function () {
  $('body').addClass('is-overflow');
  $('.filter').addClass('is-open');
  return false
});

$(document).on('click', '.js-filter-closer', function () {
  $('body').removeClass('is-overflow');
  $('.filter').removeClass('is-open');
  return false
});

//тогглер секции фильтра
$(document).on('click', '.js-filter-section-toggler', function () {
  if(!$(this).closest('.filter__section').find('.filter__section-inner').hasClass('is-open')) {
    $(this).closest('.filter__section').find('.filter__section-inner').addClass('is-open');
    $(this).addClass('is-active');
    $(this).closest('.filter__section').find('.filter__section-inner').slideToggle();
  }else {
    $(this).removeClass('is-active');
    $(this).closest('.filter__section').find('.filter__section-inner').slideToggle(function () {
      $(this).closest('.filter__section').find('.filter__section-inner').removeClass('is-open');
    });
  }
  return false
});

//слайдер рекомендованного
if($('.js-recommend').length) {
  $('.js-recommend').each(function(index) {
    var recommendSlider = new Swiper($(this)[0], {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.js-recommend-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-recommend-prev[data-id="'+$(this).attr('data-id')+'"]',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 20
        },
      },
    });
  });
}

//слайдер отзывов  вблоке о нас
if($('.js-about').length) {
  $('.js-about').each(function(index) {
    var aboutSlider = new Swiper($(this)[0], {
      loop: true,
      spaceBetween: 10,
      freeMode: true,
      speed: 11000,
      noSwiping: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      followFinger: false,
      longSwipes: false,
      disableOnInteraction: false,
      autoplay: {
        delay: 0.5,
        disableOnInteraction: false,
      }
    });
  });
}

//копирование текст
$(document).on("click", ".js-copy-text", function() {
  var button = $(this);
  var text = button.closest('.copy-text').find('input').val();
  navigator.clipboard.writeText(text);
  button.html('Скопировано');
  setTimeout(function() {
    button.html('Скопировать');
  }, 500);
});
