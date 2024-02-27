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
        el: '.js-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//слайдер готовых проектов
if($('.js-already').length) {
  const alreadySlider = new Swiper('.js-already', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
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
        slidesPerView: 4
      },
    },
    pagination: {
      el: '.js-already-navigation',
    },
    navigation: {
      nextEl: '.js-already-next',
      prevEl: '.js-already-prev',
    }
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
  const seriesSlider = new Swiper('.js-series', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.js-series-navigation',
    }
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
        el: '.js-cards-slider-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-cards-slider-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-cards-slider-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}

//тогглер сортировки
$(document).on('click', '.js-sorting-toggler', function () {
  if(!$(this).closest('.sorting').hasClass('is-active')) {
    $(this).closest('.sorting').addClass('is-active');
    $(this).addClass('is-active');
    $(this).closest('.sorting').find('.sorting__dropdown').slideToggle();
  }else {
    $(this).removeClass('is-active');
    $(this).closest('.sorting').find('.sorting__dropdown').slideToggle(function () {
      $(this).closest('.sorting').removeClass('is-active');
    });
  }

  return false
});

//слайдер в конфигураторе
if($('.js-config-thumbs').length) {
  var configThumbs = new Swiper(".js-config-thumbs", {
    spaceBetween: 20,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
}

if($('.js-config-slider').length) {
  var configSlider = new Swiper(".js-config-slider", {
    spaceBetween: 20,
    thumbs: {
      swiper: configThumbs
    },
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
        }
      },
      pagination: {
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
        el: '.js-fps-slider-2-navigation[data-id="'+$(this).attr('data-id')+'"]',
      },
      navigation: {
        nextEl: '.js-fps-slider-2-next[data-id="'+$(this).attr('data-id')+'"]',
        prevEl: '.js-fps-slider-2-prev[data-id="'+$(this).attr('data-id')+'"]',
      }
    });
  });
}
