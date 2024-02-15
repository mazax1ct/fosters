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
  $(this).closest('.accordion').find('.accordion__body').slideToggle();
  return false;
});

//обычный слайдер
if($('.js-slider').length) {
  const slider = new Swiper('.js-slider', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.js-slider-navigation',
    },
    navigation: {
      nextEl: '.js-slider-next',
      prevEl: '.js-slider-prev',
    }
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
$(document).on('click', '.tabs-menu__button', function () {
  $(this).closest('.tabs').find('.tabs-menu__button.is-active').removeClass('is-active');
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
  const cardsSlider = new Swiper('.js-cards-slider', {
    loop: true,
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
      el: '.js-cards-slider-navigation',
    },
    navigation: {
      nextEl: '.js-cards-slider-next',
      prevEl: '.js-cards-slider-prev',
    }
  });
}
