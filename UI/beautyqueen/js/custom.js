(function ($) {
  "use strict";
  var $body = $("body"),
      $window = $(window),
      $contact = $("#contact-form");
  $body.scrollspy({ target: ".navbar-collapse", offset: 20 });
  $("#slider").layerSlider({
      sliderVersion: "6.0.0",
      type: "fullsize",
      responsiveUnder: 0,
      layersContainer: 1200,
      maxRatio: 1,
      parallaxScrollReverse: !0,
      hideUnder: 0,
      hideOver: 100000,
      skin: "outline",
      showBarTimer: !1,
      thumbnailNavigation: "disabled",
      allowRestartOnResize: !0,
      skinsPath: "skins/",
      height: 800,
  });
  $("a").on("click", function (event) {
      if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $("html, body").animate({ scrollTop: $(hash).offset().top }, 1000, function () {
              window.location.hash = hash;
          });
      }
  });
  $window.on("scroll", function () {
      var bodyScroll = $window.scrollTop(),
          navbar = $(".nav-on-top"),
          logo = $(".navbar .navbar-brand> img");
      if (bodyScroll > 100) {
          navbar.addClass("fixed-header");
          logo.attr("src", "/template/2/images/logo/logo.png");
      } else {
          navbar.removeClass("fixed-header");
          logo.attr("src", "/template/2/images/logo/logo.png");
      }
  });
  if ($(".wow").length) {
      var wow = new WOW({ boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0 });
      wow.init();
  }
  $('[data-fancybox="gallery"]').fancybox({ animationEffect: "zoom-in-out", transitionEffect: "slide", transitionEffect: "slide" });
  if ($(".filter-list").length) {
      $(".filter-list").mixItUp({});
  }
  $(function () {
      $("a.video-icon").YouTubePopUp();
  });
  $(".testimonial-item").owlCarousel({ loop: !0, autoplay: !0, autoplayTimeout: 3000, margin: 0, nav: !1, dots: !0, responsive: { 0: { items: 1 }, 600: { items: 1 }, 1024: { items: 1 }, 1200: { items: 1 } } });
  $("a").on("click", function (event) {
      if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $("html, body").animate({ scrollTop: $(hash).offset().top }, 1000, function () {
              window.location.hash = hash;
          });
      }
  });
  function handlePreloader() {
      if ($(".preloader").length) {
          $(".preloader").delay(500).fadeOut(500);
          $("body").removeClass("page-load");
      }
  }
  $window.on("load", function () {
      handlePreloader();
  });
  $(window).scroll(function () {
      if ($(this).scrollTop() > 500) {
          $("#scroll").fadeIn();
      } else {
          $("#scroll").fadeOut();
      }
  });
  $("#scroll").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1000);
      return !1;
  });
  $("#datetimepicker4").datetimepicker({ format: "L" });
  $("#datetimepicker3").datetimepicker({ format: "LT" });
  if ($contact.length) {
      $contact.validate({
          rules: { name: { required: !0 }, email: { required: !0, email: !0 }, subject: { required: !0 }, message: { required: !0 } },
          messages: { name: "Please enter your First Name", email: "Please enter valid Email", subject: "Please enter your Subject", message: "Please write your Message" },
          submitHandler: function (form) {
              $("#send").attr({ disabled: "true", value: "Sending..." });
              $.ajax({
                  type: "POST",
                  url: "email.php",
                  data: $(form).serialize(),
                  success: function () {
                      $("#send").removeAttr("disabled").attr("value", "Send");
                      $("#success").slideDown("slow");
                      setTimeout(function () {
                          $("#success").slideUp("slow");
                      }, 5000);
                      form.reset();
                  },
                  error: function () {
                      $("#send").removeAttr("disabled").attr("value", "Send");
                      $("#error").slideDown("slow");
                      setTimeout(function () {
                          $("#error").slideUp("slow");
                      }, 5000);
                  },
              });
              return !1;
          },
      });
  }
})(jQuery);
