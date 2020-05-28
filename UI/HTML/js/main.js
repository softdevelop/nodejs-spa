(function ($) {
    "use strict";
    var main_wind = $(window);
    var wWidth = $(window).width();

    jQuery(document).ready(function ($) {

        //-----menuzord------
        jQuery("#menuzord").menuzord({
            trigger: "hover",
            indicatorFirstLevel: '<i class="fa fa-angle-down"></i>',
            indicatorSecondLevel: '<i class="fa fa-angle-right"></i>'
        });


        /*--------home page slider---------*/
        $("#home1-slider").slick({
            autoplay: false,
            autoplaySpeed: 7000,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnHover: false,
            dots: false,
            pauseOnDotsHover: true,
            cssEase: 'linear',
            fade: true,
            draggable: true,
            prevArrow: '<button class="PrevArrow"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button class="NextArrow"><i class="fa fa-angle-right"></i></button>',
        });


        //------------nice select-----------
        $('select').niceSelect();

        //-----------video venobox--------
        $('.venobox').venobox();

        //----------moving to welcome section on clicking mouse icon---------
        $("#mouse").on("click", function () {
            $("html, body").animate({
                scrollTop: $("#welcome").offset().top - 0 + 'px'
            }, 1200);
        });

        //-----------facts counter----------
        $('.counter').counterUp({
            //delay: 10, // the delay time in ms
            time: 800 // the speed time in ms
        });


    }); //--end document ready function--


    //------sticky menu----
    main_wind.on('scroll', function () {
        if ($(this).scrollTop() >= 35) {
            $(".sticky-menu").addClass("sticked");
        } else {
            $(".sticky-menu").removeClass("sticked");
        }
    });


    //-----------bootstrap popover-----------
    $("#popover1").popover({
        html: true,
        placement: 'top',
        content: function () {
            return $("#popover-content1").html();
        }
    });
    $("#popover2").popover({
        html: true,
        placement: 'top',
        content: function () {
            return $("#popover-content2").html();
        }
    });
    $("#popover3").popover({
        html: true,
        placement: 'top',
        content: function () {
            return $("#popover-content3").html();
        }
    });



    //--------slick carousel for welcome sectioin----------
    $('#carousel-img').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        speed: 1200,
        cssEase: 'ease-in-out',
        fade: true,
        asNavFor: '#carousel-text'
    });
    $('#carousel-text').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '#carousel-img',
        speed: 900,
        cssEase: 'ease-in-out',
        focusOnSelect: true
    });


    /*---------booking date picker---------*/
    $("#booking-date").datepicker({
        dateFormat: 'dd/mm/yy',
        minDate: "new Date()",
    });


    //----------product gallery-----------
    $('#product-gallery-v1').isotope({
        itemSelector: '.mason',
    });


    //---------product list view and grid view---------
    $('#list-view').on('click', function () {
        $("#product-gallery-v2").addClass('list-view');
        $("#grid-view").removeClass('active');
        $(this).addClass('active');
    });
    $('#grid-view').on('click', function () {
        $("#product-gallery-v2").removeClass('list-view');
        $("#list-view").removeClass('active');
        $(this).addClass('active');
    });


    //--------------pricing range slider----------
    $("#range").slider({
        range: true,
        min: 200,
        max: 10000,
        values: [200, 5000],
        slide: function (event, ui) {
            $("#minVal").html(ui.values[0]);
            $("#maxVal").html(ui.values[1]);
        }
    });
    $("#minVal").html($("#range").slider("values", 0));
    $("#maxVal").html($("#range").slider("values", 1));


    //--------product quantity increase or decrease-----
    $(".increse").on('click', function () {
        var old = $(this).parent().find('#number').val();
        var newn = parseInt(old);
        $(this).parent().find('#number').val(newn + 1);
    });

    $(".decrese").on('click', function () {
        var old = $(this).parent().find('#number').val();
        var newn = parseInt(old);
        if (newn > 1) {
            $(this).parent().find('#number').val(newn - 1);
        }
    });



    //------------Isotop active-----------
    var $grid = $('.gallery-wrapper').isotope({
        itemSelector: '.mix',
        masonry: {}
    });

    var filterFns = {
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
    };
    $('.filtering-menu').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
            filter: filterValue
        });
    });
    $('.filtering-menu').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'li', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
    $grid.imagesLoaded().progress(function () {
        $grid.isotope('layout');

    });


    /*------------product carousel-------------*/
    $("#product-carousel").owlCarousel({
        items: 4,
        loop: true,
        dots: false,
        nav: true,
        margin: 25,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplay: true,
        smartSpeed: 1200,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            }
        }
    });


    //-------experts carousel-------
    $("#experts-carousel").owlCarousel({
        items: 4,
        loop: true,
        dots: false,
        nav: true,
        margin: 25,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplay: true,
        smartSpeed: 1200,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        }
    });


    //-------testimonial carousel-------
    $(".testimoial-wrapper").owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        autoplay: true,
        smartSpeed: 1100,
        autoplayHoverPause: true
    });


    //-------home page-3 hero carousel-------
    $("#home3-carousel").owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        nav: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        smartSpeed: 1200,
        autoplayTimeout: 9000,

    });


    //--------Scroll Top---------
    main_wind.on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top').fadeIn();
            $('.scroll-top').removeClass('not-visible');
        } else {
            $('.scroll-top').fadeOut();
        }
    });
    $('.scroll-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });


}(jQuery));
