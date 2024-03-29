var books = [];

jQuery.fn.createBoard = function (link) {
   this.each(function () {
      elem = $(this);

      /* var configuration = {
         link: "/book/getMostPopular",
      }
      jQuery.extend(configuration, link);

      $.post(link, function (data) {
         for (let i = 0; i < data.length; i++) {
            books[i] = {
               title: data[i].Title,
               cover: data[i].Cover,
               slug: data[i].Slug,
            };

         }
         createImages(elem);
      }, "json"); */

      createImages(elem);
   });
   return this;
};

jQuery.fn.destroyBoard = function (link) {
   this.each(function () {
      elem = $(this);
      elem.find(".board_img").remove();
   });
   return this;
};

//Función que crea las imagenes y las añade al tablón
function createImages(tablon) {

   var positions = [];

   //Crear las imagenes con sus propiedades y añadirlas
   for (let i = 0; i < 6; i++) {
      var img = $('<img />',
         {
            class: 'board_img',
            src: "/img/Portada-libro.jpg",
            width: '100px',
            height: '150px',
            alt: 'imagen',
            "data-title": "Mauris sed dapibus",
            "data-link": "/book/Mauris sed dapibus",
         }).appendTo(elem);

      img.css("position", "relative");
      img.css("display", "inline");
      //Se genera aleatoriamente la posición y a partir de la segunda imagen se comprueba que no colisionen
      do {
         img.css("left", Math.random() * 500 + 30 + "px");
         img.css("top", Math.random() * 250 + 30 + "px");
         elem.append(img);
         img.click(function () {
            $("#lightbox_image").attr("src", $(this).attr("src"))
            $(".lightbox").dialog("option", "title", $(this).attr("data-title"));
            var redirect = ($(this).attr("data-link"));
            $(".lightbox").dialog("option", "buttons",
               [
                  {
                     text: "See Book",
                     icon: "ui-icon-zoomin",
                     click: function () {
                        window.location.href = redirect;
                     }
                  },
               ]
            );
            $(".lightbox").dialog("open");
         });
         if (i == 0) {
            break;
         }
      } while (comprobarPosicion(positions, img));

      positions.push(img);
   }

}

//Función que compara si se chocan dos imagenes
function isCollide(a, b) {
   return !(
      ((a.offset().top + 150) < (b.offset().top)) ||
      (a.offset().top > (b.offset.top + 150)) ||
      ((a.offset().left + 100) < b.offset().left) ||
      (a.offset().left > (b.offset().left + 100))
   );
}

//Función que va comprobando si se choca la posición generada con todas las ya creadas
function comprobarPosicion(positions, position) {
   for (let j = 0; j < positions.length; j++) {
      if (isCollide(position, positions[j]) || isCollide(positions[j], position)) {
         return true;
      }
   }

   return false;
}