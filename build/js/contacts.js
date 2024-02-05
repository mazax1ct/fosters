var mapShowed = false;

var ymapsInserted = false;

var contacts_map;

function mapInit(elem) {
  contacts_map = new ymaps.Map(elem, {
    center: [59.925301, 30.319300],
    zoom: 16
  }, {
    searchControlProvider: 'yandex#search'
  });

  contacts_map.behaviors.disable('scrollZoom');

  var i, placemark;


  placemark = new ymaps.Placemark([59.925301, 30.319300], {hintContent: 'ТК "Сенная", ул. Ефимова дом 3'}, {});

  contacts_map.geoObjects.add(placemark);


  var body = document.querySelector('body');
  if (body.offsetWidth < 768) {
    contacts_map.behaviors.disable('drag');
    contacts_map.behaviors.enable('MultiTouch');
  }
}

window.onload = () => {
  //цель наблюдения
  let target = document.getElementById('contacts_map');

  if(target) {
    // настройки
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    }

    // функция обратного вызова
    let callback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting > 0) {
          if(mapShowed != true) {
            var elem = document.createElement('script');
            elem.type = 'text/javascript';
            elem.src = 'https://api-maps.yandex.ru/2.1/?apikey=9d7b529c-c833-4e6e-b74e-a623a6a75a71&load=package.full&lang=ru_RU';

            var container = document.getElementById('contacts_map');
            container.appendChild(elem);
            mapShowed = true;

          	setTimeout( function() {
              mapInit(container);
              ymapsInserted = true;
            }, 3000);
          }
        }
      });
    }

    // наблюдатель
    let observer = new IntersectionObserver(callback, options);

    observer.observe(target);
  }
}
