(function($) {
    "use strict";
    var main_wind = $(window);
    var wWidth = $(window).width();

    jQuery(document).ready(function($) {

        //-----menuzord------
        jQuery("#menuzord").menuzord({
            trigger: "hover",
            indicatorFirstLevel: '<i class="fa fa-angle-down"></i>',
            indicatorSecondLevel: '<i class="fa fa-angle-right"></i>'
        });

        /*--------home page slider---------*/

        //------------nice select-----------
        $('select').niceSelect();

        //-----------video venobox--------
        $('.venobox').venobox();

        //----------moving to welcome section on clicking mouse icon---------
        $("#mouse").on("click", function() {
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
    main_wind.on('scroll', function() {
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
        content: function() {
            return $("#popover-content1").html();
        }
    });
    $("#popover2").popover({
        html: true,
        placement: 'top',
        content: function() {
            return $("#popover-content2").html();
        }
    });
    $("#popover3").popover({
        html: true,
        placement: 'top',
        content: function() {
            return $("#popover-content3").html();
        }
    });

    /*---------booking date picker---------*/
    $("#booking-date").datepicker({
        dateFormat: 'dd - mm - yy',
        minDate: "new Date()",
    });
    // $("#booking-date2").daterangepicker();

    $("#booking-date2").datepicker({
        dateFormat: 'dd - mm - yy',
        minDate: "new Date()",
    });


    //----------product gallery-----------
    $('#product-gallery-v1').isotope({
        itemSelector: '.mason',
    });


    //---------product list view and grid view---------
    $('#list-view').on('click', function() {
        $("#product-gallery-v2").addClass('list-view');
        $("#grid-view").removeClass('active');
        $(this).addClass('active');
    });
    $('#grid-view').on('click', function() {
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
        slide: function(event, ui) {
            $("#minVal").html(ui.values[0]);
            $("#maxVal").html(ui.values[1]);
        }
    });
    $("#minVal").html($("#range").slider("values", 0));
    $("#maxVal").html($("#range").slider("values", 1));


    //--------product quantity increase or decrease-----
    $(".increse").on('click', function() {
        var old = $(this).parent().find('#number').val();
        var newn = parseInt(old);
        $(this).parent().find('#number').val(newn + 1);
    });

    $(".decrese").on('click', function() {
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
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt(number, 10) > 50;
        },
    };
    $('.filtering-menu').on('click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        filterValue = filterFns[filterValue] || filterValue;
        $grid.isotope({
            filter: filterValue
        });
    });
    $('.filtering-menu').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'li', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
    $grid.imagesLoaded().progress(function() {
        $grid.isotope('layout');

    });


    /*------------product carousel-------------*/
    //--------Scroll Top---------
    main_wind.on('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top').fadeIn();
            $('.scroll-top').removeClass('not-visible');
        } else {
            $('.scroll-top').fadeOut();
        }
    });
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });


}(jQuery));