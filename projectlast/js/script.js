$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 1200,

    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: false,
        },
      },
    ],
  });
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab__active)",
    function () {
      $(this)
        .addClass("catalog__tab__active")
        .siblings()
        .removeClass("catalog__tab__active")
        .closest("div.container")
        .find("div.catalog__content")
        .removeClass("catalog__content__active")
        .eq($(this).index())
        .addClass("catalog__content__active");
    }
  );

  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });

  $(".catalog-item__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-item__content")
        .eq(i)
        .toggleClass("catalog-item__content_active");
      $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
    });
  });
  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button__mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item_subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });
  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 10,
        },
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: {
          required: "ПОЖАЛУЙСТА, Введите своё имя",
          minlength: jQuery.validator.format("Введите хотя бы {0}  символа"),
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Введите свою почту",
          email: "неправильно введён адрес почты",
        },
      },
    });
  }
  validateForms("#consultation-form");
  validateForms("#consultation form");
  validateForms("#order form");
  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");

      $("form").trigger("reset");
    });
    return false;
  });
});
