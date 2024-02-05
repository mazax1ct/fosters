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
