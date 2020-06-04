jQuery.noConflict();
jQuery(document).ready(function($){
    "use strict";

    var currentWidth = window.innerWidth || document.documentElement.clientWidth;

    // Loader
    if( dttheme_urls.loadingbar === "enable") {
        Pace.on("done", function(){
            $(".loader").fadeOut(500);
            $(".pace").remove();
        });
    }

    // Sticky Row
    if( $("#header-wrapper .apply-sticky-header").length > 0 ){
	    $("#header-wrapper .apply-sticky-header").sticky({ topSpacing: 0 });
    }
    
    // Mega Menu
        if ( $('li.has-mega-menu').length>0 && $('.dt-no-header-builder-content').length==0 ) {

            jQuery.fn.liCenter = function () {

                var w = $('#header .container').width(),
                    a = $(window).width(),
                    c = $('.dt-header-menu').parents('.wpb_column'),
                    ol = $('.dt-header-tpl').offset().left;

                c.addClass("dt-col-static-position");
                $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul > li.menu-item-object-dt_mega_menus').css("width", w+"px");

                return this;
            };

            $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul').liCenter();

            $(window).resize(function(){
                $('.mega-menu-page-equal li.has-mega-menu:not(.mega-menu-custom-width) > ul').liCenter();
            });
        }

    // Mobile Menu    

    $('.alignfull').each(function () {
        if($(this).parents('#primary').hasClass('content-full-width')) {

            if($(this).parents('body').hasClass('layout-boxed')) {

                if($('body').hasClass('single-post') && $(this).parents('.blog-single-entry').hasClass('post-boxed')) {

                    var windowWidth = $(window).width();
                    $(this).css('width', windowWidth);

                    var $containerPadding = $(this).parents('.entry-body');

                    var offset = 0 - $containerPadding.offset().left;
                    $(this).css('left', offset);

                } else {

                    var containerWidth = $('.layout-boxed .wrapper').width();
                    $(this).css('width', containerWidth);
                    
                    var mainLeft = $('#main').offset().left;
                    var primaryLeft = $('#primary').offset().left;

                    var sectionMargin = parseInt(primaryLeft, 10) - parseInt(mainLeft, 10);

                    var offset = 0 - sectionMargin;
                    $(this).css('left', offset);
                
                }

            } else {

                if($('body').hasClass('single-post') && $(this).parents('.blog-single-entry').hasClass('post-boxed')) {
                   
                    var windowWidth = $(window).width();
                    $(this).css('width', windowWidth);

                    var $containerPadding = $(this).parents('.entry-body');

                    var offset = 0 - $containerPadding.offset().left;
                    $(this).css('left', offset);

                } else {
                    var windowWidth = $(window).width();
                    $(this).css('width', windowWidth);

                    var $container = '';
                    $container = $(this).parents('.blog-single-entry');

                    if( !$container.length ) {
                        $container = $(this).parents('.type-page');
                    }

                    var offset = 0 - $container.offset().left;
                    $(this).css('left', offset);
                    
                }

            }

        }
    });

    // Gutenberg - WP Category Widget Fix
    if($('.wp-block-categories-list').length) {
        loopCategories($('.wp-block-categories-list'));
        function loopCategories(item) {
            item.find('li').each(function() {
                var span_text = $(this).find('span').html();
                $(this).find('span').remove()
                $('<span>'+span_text+'</span>').insertAfter($(this).find('a')); 

                if($(this).find('ul.children').length) {
                    loopCategories($(this).find('ul.children'));
                }
            });
        }
    }

        // Move Nav as Mobile Nav
        $("div.dt-header-menu").each(function(){
            var d = $(this).data('menu'),
                c = $(this).find('ul[data-menu="'+d+'"]').clone(),
                m = $('body').find('.mobile-menu[data-menu="'+d+'"]');

            // To Remove animation classes
            $('[data-animation]', c ).each(function(ix, ele ){
                var $classes = $(ele).attr("class"),
                    $animation = $(ele).attr("data-animation");

                $classes = $classes.replace($animation, '');
                $(ele).attr("class", $classes);
            });           

            c.prependTo(m);
        });

        // Opening Mobile Nav
        $('.menu-trigger').on('click', function( event ){
            $(this).next('.mobile-menu').toggleClass('nav-is-visible');
            $(this).parent('.mobile-nav-container').find('.overlay').toggleClass('is-visible');
            $('body').toggleClass('nav-is-visible');
        });

        // Closing Mobile Nav
            function closeMobNav() {
                $('body').removeClass('nav-is-visible');
                $('.overlay').removeClass('is-visible');
                $('.mobile-menu').removeClass('nav-is-visible');
                $('.menu-item-has-children a').removeClass('selected');        
                $('.menu-item-has-children ul.sub-menu').addClass('is-hidden');            
            }

            $('li.close-nav').on('click', function(event){
                closeMobNav();
            });

            $('.mobile-nav-container > .overlay').on('click', function(event){
                closeMobNav();
            });

        // Sub Menu in Mobile Menu
        $('.menu-item-has-children > a, .page_item_has_children > a').on('click', function(event) {

            if ( $('body').hasClass('nav-is-visible') ) {
                event.preventDefault();
                var a = $(this).clone();
                $(this).next('.sub-menu').find('.see-all').html(a);
            }

            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                selected.addClass('selected').next('ul.sub-menu').removeClass('is-hidden');
            } else {
                selected.removeClass('selected').next('ul.sub-menu').addClass('is-hidden');
            }
        });

        // Go Back in Mobile Menu
        $('.go-back').on('click', function(){
            $(this).parent('ul:not(.menu)').addClass('is-hidden');
        });

        // Remove is-hidden class on desktop menu hover

        jQuery('.dt-header-menu .menu-item-has-children > a, .dt-header-menu .page_item_has_children > a').mouseover(function(e) {
            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                selected.addClass('selected').next('ul.sub-menu').removeClass('is-hidden');
            } else {
                selected.removeClass('selected').next('ul.sub-menu').addClass('is-hidden');
            }     
            e.preventDefault();
        }).mouseout(function(e) {
            var selected = $(this);
            if( selected.next('ul').hasClass('is-hidden') ) {
                selected.addClass('selected').next('ul.sub-menu').removeClass('is-hidden');
            } else {
                selected.removeClass('selected').next('ul.sub-menu').addClass('is-hidden');
            }
            e.preventDefault();
        });


    // Visual Nav Menu
        if( $('ul.visual-nav').length > 0 ) {

            $('ul.visual-nav').visualNav({
                selectedClass     : 'current_page_item',
                externalLinks     : 'external',
                useHash           : false,
                // offsetTop : 100
            });          
        }

    if( $("div.dt-video-wrap").length ) {
        $("div.dt-video-wrap").fitVids();        
    }

    if( $('a.video-image').length ) {
        $('a.video-image').prettyPhoto({
            animation_speed:'normal',
            theme:'facebook',
            slideshow:3000,
            autoplay_slideshow: false,
            social_tools: false,
            deeplinking:false
        });
    }

    $("body").on("click", ".reviews_tab a", function() {
        setTimeout(function() {
          $("html, body").getNiceScroll().resize();
        }, 100);
    });

    // Container
    if( currentWidth > 767 ) {
        if( $('#primary').hasClass('with-both-sidebar') ) {
            if( ( $('#secondary-left > div').is(':empty') && $('#secondary-right > div').is(':empty')) ){
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-both-sidebar");
            }else if( $('#secondary-left > div').is(':empty') ){
                $('#primary').addClass("with-right-sidebar").removeClass("with-both-sidebar");
            }else if( $('#secondary-right > div').is(':empty') ){
                $('#primary').addClass("with-left-sidebar").removeClass("with-both-sidebar");
            }
        } else if( $('#primary').hasClass('with-left-sidebar') ) {
            if( $('#secondary-left > div').is(':empty') ){
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-left-sidebar");
            }
        } else if( $('#primary').hasClass('with-right-sidebar') ) {
            if( $('#secondary-right > div').is(':empty') ){
                $('#primary').addClass("content-full-width").removeClass("page-with-sidebar with-right-sidebar");
            }
        }
    }

    if( $('#main').hasClass( 'sidebar-as-sticky' ) ) {
        $('#main .sidebar-as-sticky').theiaStickySidebar({
            additionalMarginTop: 70,
            containerSelector: $('#primary').parent('.container')
        });
    }

    if($('.sidenav-sticky').length){
        $('.sidenav-sticky .side-navigation').theiaStickySidebar({
            additionalMarginTop: 90,
            containerSelector: $('#primary')
        });
    }    

    // <select> 
    $("select").each(function(){
        if(!$(this).parents('body').hasClass('woocommerce-cart') && !$(this).parents('body').hasClass('woocommerce-checkout')) {
            if($(this).css('display') != 'none') {
                $(this).wrap( '<div class="selection-box"></div>' );
            }
        } else if( $(this).parents('section').hasClass('secondary-sidebar') ) {
            if($(this).css('display') != 'none') {
                $(this).wrap( '<div class="selection-box"></div>' );
            }
		}
    });

    $('.activity-type-tabs > ul >li:first').addClass('selected');
    $('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');

    $('.downcount').each(function(){ // Also used for woocommerce countdown
        var el = $(this);
        el.downCount({
            date    : el.attr('data-date'),
            offset  : el.attr('data-offset')
        });
    });

    $('p:empty').each(function (){
        $(this).next('br').remove();
        $(this).remove();
    });

    // Map Overlay
        $('.dt-sc-contact-details-on-map a.map-switch-icon').on( "click", function() {
            $(this).parents('.dt-sc-contact-details-on-map').toggleClass('hide-overlay');
            $('.dt-sc-map-overlay').toggle();
            return false;
        });

        $('.dt-sc-contact-details-on-map a.switch-icon').on( "click", function() {
            $(this).parents('.dt-sc-contact-details-on-map').addClass('hide-overlay');
            $('.dt-sc-map-overlay').toggle();
            $('.back-to-contact').toggle();
            return false;
        });

        $('.dt-sc-contact-details-on-map a.back-to-contact').on( "click", function() {
            $(this).parents('.dt-sc-contact-details-on-map').removeClass('hide-overlay');
            $('.dt-sc-map-overlay').toggle();
            $(this).toggle();
            return false;
        });

    //Smart Resize
    $(window).on("resize", function() {

        //Blog Template
        if( $(".apply-isotope").length ) {
            $(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
        }
    });

    $(".dt-like-this").on('click', function(){

        var el = jQuery(this);

        if( el.hasClass('liked') ) {
            return false;
        }

        var post = {
            action: 'triss_likes_ajax',
            post_id: el.attr('data-id')
        };

        $.post(dttheme_urls.ajaxurl, post, function(data){
            el.find('span').html(data);
            el.addClass('liked');
        });
        return false;
    });

    if( $('input, textarea').length ) {
        $('input, textarea').placeholder();        
    }

    // Toggle store locator advacned options
	$("a.dt-sc-toggle-advanced-options").on('click', function( event ){
		event.preventDefault();
		var $this = $(this);
		$this.parents('.wpsl-search').find( "div.dt-sc-advanced-options" ).slideToggle( "slow", function() {
			$this.toggleClass('expanded');
			if($this.hasClass('expanded')) {
				$this.html(dttheme_urls.advOptions + ' <span class="fas fa-angle-up"></span>');
			} else {
				$this.html(dttheme_urls.advOptions + ' <span class="fas fa-angle-down"></span>');
			}
		});
	});

    //Single post like btn
    if( $(".single-post").length ) {
        $(".dt_like_btn a").on("click",function() {
            var btn = $(this);
            var post_id = btn.data("postid");
            var act = btn.data("action");

            $.ajax({
                type: "post",
                url: dttheme_urls.ajaxurl,
                data: { action: 'triss_post_rating_like',
                        nonce: dttheme_urls.wpnonce,
                        post_id: post_id,
                        doaction: act
                      },
                success: function(data, textStatus, XMLHttpRequest){
                        btn.find('span').text(data);
                },
                error: function(MLHttpRequest, textStatus, errorThrown){
                    //alert(textStatus);
                }
            });
            return false;
        });
    }

    //Scroll down animate
    $(".dt_scroll_down a").on('click', function(a){
        a.preventDefault();

        var st = 0;
        if(dttheme_urls.stickynav === 'enable') {
            st = 90;
        }

        $("html, body").stop();
        $("html, body").animate({
            scrollTop: $('.entry-details.within-image').offset().top - st
        }, {
            duration: 1000,
            easing: "easeInOutQuart"
        });
    });    
          

    // Go To Top
    if(dttheme_urls.enable_totop) {
        $().UItoTop({ easingType: 'easeOutQuart' });
    }

    if( $('.dt-sc-icon-box-type9').length ) {
        setTimeout(function(){
            $('.dt-sc-icon-box-type9').each(function(){
                $(this).find('.icon-wrapper').css('height', $(this).find('.icon-content').outerHeight(true) );
            });
        },1000);
    }
        
    if( $('ul.dt-sc-tabs-vertical-frame').length ) {
        $('ul.dt-sc-tabs-vertical-frame').each(function(){
            $(this).css('min-height', $(this).height() );
        });
    }

    if( $('ul.dt-sc-tabs-vertical').length ) {
        $('ul.dt-sc-tabs-vertical').each(function(){
            $(this).css('min-height', $(this).height() );
        });
    }   

    // Breadcrumb parallax section
    if($(".dt-parallax-bg").length) {
        $('.dt-parallax-bg').each(function(){
            $(this).find('.main-title-section-bg').on('inview', function (event, visible) {
                if(visible === true) {
                    $(this).parallax("50%", 0.3);
                }
            });
        });
    }

	// Related article animation
	dt_blog_related_article();
    function dt_blog_related_article(){

        var $related = $(".related-article");
        var $relatedflag = $(".related-flag");
        var effect = 'auto';

        if($related.length) {
            $related.mouseover(function() {
                effect = 'normal';
                $related.addClass('open');
            }).mouseout(function() {
                $related.removeClass('open');
            });

            $relatedflag.waypoint(function (direction) {
                if(effect == 'auto') {
                    if(direction == 'up'){
                        $related.removeClass('open');
                    } else {
                        $related.addClass('open');
                    }
                }

            }, {
                offset: '100%',
                context: window
            });
        }
    }

	$('.single .entry-thumb.single-preview-img a.mag-pop, a.lightbox-preview-img').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
		  verticalFit: true,
		  titleSrc: function(item) {
			return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">image source</a>';
		  }
		},
		zoom: {
		  enabled: true,
		  duration: 300, // don't foget to change the duration also in CSS
		  opener: function(element) {
			return element.find('img');
		  }
		}
	});
});

(function ($) {

	var dtBlogPostsWidgetHandler = function($scope, $){

		$(window).load(function(){
			//Gallery Post Slider
			if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
				$("ul.entry-gallery-post-slider").bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true });
			}

			//Blog Template
			if( $(".apply-isotope").length ) {
				$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { columnWidth: '.grid-sizer' } });
			}

			//Equal Height
			if( $('.tpl-blog-holder.apply-equal-height').length ) {
				$(".tpl-blog-holder.apply-equal-height article").matchHeight({ property:"min-height" })
			}	
		});

		//Ajax masonry load more items
		$('.dt-sc-posts-list-wrapper').each(function(){
			var $page = 1;
			var $T = $(this);
			var $data = "", $content = $T.find('.tpl-blog-holder');

			var $b = $T.find('.loadmore-btn.more-items');

			if( $b.length ) {
				// When load more button click...
				$($b).live( "click", function() {

				  var $this = $(this);
				  var $count = $this.attr('data-count'), $cats = $this.attr('data-cats'), $style = $this.attr('data-style'), $layout = $this.attr('data-layout'),
				  $column = $this.attr('data-column'), $list_type = $this.attr('data-listtype'), $hover = $this.attr('data-hover'),
				  $overlay = $this.attr('data-overlay'), $align = $this.attr('data-align'), $mpages = $this.attr('data-maxpage'),
				  $pos = $this.attr('data-pos'), $eheight = $this.attr('data-eheight'), $meta = $this.attr('data-meta');

				  if( $meta != '' ) {
					  $meta = JSON.parse( $meta );
				  }

				  $content.addClass('loading');

				  if( $this.hasClass('more-items') ) {
					$page++;
				  }
	
				  $.ajax({
					 type : "post",
					 dataType : "html",
					 url : dttheme_urls.ajaxurl,
					 data : { action: "triss_ajax_load_more_post", count: $count, cats: $cats, pos: $pos, style: $style, layout: $layout, column: $column, pageNumber: $page, listtype: $list_type, hover: $hover, overlay: $overlay, align: $align, meta: $meta },
					 cache: true,
					 success: function (data) {
						var $res = data.split('#####$$$$$');
						if ($res.length > 0) {
	
							$content.append($res[0]);
							$T.find('.loadmore-btn').attr('data-pos', $res[1]);
	
							var newbx = $content.find('ul.entry-gallery-post-slider');
							if(newbx !== null){
								newbx.bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true});
							}
	
							if( $eheight == '' ) {
								$content.css({overflow:'hidden'}).isotope( 'reloadItems' ).isotope();
								$(window).trigger( 'resize' );
							}
	
							if(parseInt($page) >= parseInt($mpages)) {
								$T.find('.loadmore-btn').removeClass('more-items').html('All Posts Loaded');
							} else {
								$T.find('.loadmore-btn').addClass('more-items');
							}
						}
						$content.removeClass('loading');
					 },
					 error: function (jqXHR, textStatus, errorThrown) {
						$content.html('No More Posts Found');
					 }
				  });
				  return false;
				});
			}

			$(window).scroll(function(){
				var $c = $T.find('.infinite-btn.more-items');
	
				var ST = $(window).scrollTop();
				var DH = $(document).height();
				var WH = $(window).height();
	
				if( ( parseInt(ST) == parseInt(DH) - parseInt(WH) ) && $c.length > 0 ){
	
					var $count = $c.attr('data-count'), $cats = $c.attr('data-cats'), $style = $c.attr('data-style'), $layout = $c.attr('data-layout'),
					$column = $c.attr('data-column'), $list_type = $c.attr('data-listtype'), $hover = $c.attr('data-hover'),
					$overlay = $c.attr('data-overlay'), $align = $c.attr('data-align'), $mpages = $c.attr('data-maxpage'),
					$pos = $c.attr('data-pos'), $eheight = $c.attr('data-eheight'), $meta = $c.attr('data-meta');
	
					if( $meta != '' ) {
						$meta = JSON.parse( $meta );
					}
	
					$content.addClass('loading');
	
					$page++;
	
					$.ajax({
					   type : "post",
					   dataType : "html",
					   url : dttheme_urls.ajaxurl,
					   data : { action: "triss_ajax_load_more_post", count: $count, cats: $cats, pos: $pos, style: $style, layout: $layout, column: $column, pageNumber: $page, listtype: $list_type, hover: $hover, overlay: $overlay, align: $align, meta: $meta },
					   cache: true,
					   success: function (data) {
						  var $res = data.split('#####$$$$$');
						  if ($res.length > 0) {
		
							  $content.append($res[0]);
							  $T.find('.infinite-btn').attr('data-pos', $res[1]);

							  var newbx = $content.find('ul.entry-gallery-post-slider');
							  if(newbx !== null){
								  newbx.bxSlider({mode: 'fade', auto:false, video:true, pager:'', autoHover:true, adaptiveHeight:false, responsive: true});
							  }

							  if( $eheight == '' ) {
								  $content.css({overflow:'hidden'}).isotope( 'reloadItems' ).isotope();
								  $(window).trigger( 'resize' );
							  }
		
							  if(parseInt($page) >= parseInt($mpages)) {
								  $c.removeClass('more-items');
							  }
						  }
						  $content.removeClass('loading');
					   },
					   error: function (jqXHR, textStatus, errorThrown) {
						  $content.html('No More Posts Found');
					   }
					});

					return false;
				}
			});
		});
	};

	var dtBlogRelatedPostsWidgetHandler = function($scope, $){

		if($(".dt-sc-related-posts.dt-related-carousel").length) {
			$(".dt-sc-related-posts.dt-related-carousel").each(function(){

			  var $min = parseInt($(this).attr('data-items'));

			  if($(window).width() <= 767 || $('#primary').width() <= 570 ) { $min = 1; }

			  var prv = $(this).find('.prev-arrow'); var nxt = $(this).find('.next-arrow');
			  var pager = $(this).find('.carousel-pager');

			  var $This = $(this).find('.tpl-blog-holder');
			  $This.removeClass('apply-isotope');
			  $This.find('.grid-sizer').remove();

			  $This.carouFredSel({
				responsive: true,
				width: '100%',
				auto: false,
				prev: prv,
				next: nxt,
				pagination: pager,
				height: 'variable',
				items: { width: parseInt( 1200 / $min ),  height: 'variable', visible: { min: $min } },
				onCreate: function () {
					$(window).on("resize", function() {
						$This.trigger('configuration', ['debug', false, true]);
					}).trigger('resize');
				},
				swipe: {
					onMouse: true,
					onTouch: true
				}
			  });
			});
		}
	};

	var dtLightboxWidgetHandler = function($scope, $){

		$scope.find('.single .entry-thumb.single-preview-img a.mag-pop, a.lightbox-preview-img').magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
			  verticalFit: true,
			  titleSrc: function(item) {
				return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('href')+'" target="_blank">image source</a>';
			  }
			},
			zoom: {
			  enabled: true,
			  duration: 300, // don't foget to change the duration also in CSS
			  opener: function(element) {
				return element.find('img');
			  }
			}
		});
	};

    //Elementor JS Hooks
    $(window).on('elementor/frontend/init', function () {

		elementorFrontend.hooks.addAction('frontend/element_ready/dt-blog-posts.default', dtBlogPostsWidgetHandler);
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-post-related-posts.default', dtBlogRelatedPostsWidgetHandler);
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-post-feature-image.default', dtLightboxWidgetHandler);
		elementorFrontend.hooks.addAction('frontend/element_ready/dt-lightbox.default', dtLightboxWidgetHandler);

    });

	dtBlogPostsWidgetHandler(jQuery('body'), jQuery);
	dtBlogRelatedPostsWidgetHandler(jQuery('body'), jQuery);
	dtLightboxWidgetHandler(jQuery('body'), jQuery);

})(jQuery);