/**
 * @package 	WordPress
 * @subpackage 	Wellness SPA
 * @version 	1.1.4
 * 
 * WooCommerce Scripts
 * Created by CMSMasters
 * 
 */
 
 
"use strict";

jQuery(document).ready(function() {
	
	setTimeout(function() {
		if (
			jQuery('.cmsmasters_dynamic_cart .widget_shopping_cart_content > ul li').length != 0 && 
			jQuery('.cmsmasters_dynamic_cart .widget_shopping_cart_content > ul li').hasClass('empty') != true
		) {
			jQuery('.cmsmasters_dynamic_cart').css({'opacity' : '1', 'visibility' : 'visible'});
		}
	}, 2000);
	
	
	cmsmasters_ajax_add_to_cart();
	
	jQuery('.cmsmasters_add_to_cart_button').on('click', function() {
		jQuery('.cmsmasters_dynamic_cart').css({'opacity' : '1', 'visibility' : 'visible'});
	});
	
	
	jQuery('body').on('added_to_cart', update_dynamic_cart);
	
	
	// Mobile Hover Products in Shop Page
	jQuery('.touch .cmsmasters_product .cmsmasters_product_img').on('click', function() { 
		jQuery('*:not(this)').removeClass('cmsmasters_mobile_hover');
		
		
		jQuery(this).addClass('cmsmasters_mobile_hover');
	} );
	
	
	jQuery(window).scroll(function () {
		if( jQuery('.footer_copyright').length && ( jQuery(this).scrollTop() + jQuery(this).height() ) > jQuery('.footer_copyright').offset().top) {
			jQuery('.woocommerce-store-notice').css({'position' : 'relative'});
		} else {
			jQuery('.woocommerce-store-notice').css({'position' : 'fixed'});
		}
	} );
} );


function update_dynamic_cart(event) { 
	"use strict";
	
	var product = jQuery.extend( { 
		name : 		'', 
		image : 	'' 
	}, cmsmasters_added_product);
	
	
	if (typeof event != 'undefined') {
		var cart_button = jQuery('.cmsmasters_dynamic_cart .cmsmasters_dynamic_cart_button');

		if (product.image.length != 0) {
            var template = jQuery(
                '<div class="cmsmasters_added_product_info">' +
					product.image +
                	'<span class="cmsmasters_added_product_info_text">' + product.name + '</span>' +
                '</div>'
            );
        } else {
            var template = jQuery(
                '<div class="cmsmasters_added_product_info">' +
                	'<span class="cmsmasters_added_product_info_text">' + product.name + '</span>' +
                '</div>'
            );
        }
		
		
		jQuery(event.currentTarget).find('a.cmsmasters_to_show').removeClass('cmsmasters_to_show').addClass('cmsmasters_visible');
		
		
		template.appendTo('.cmsmasters_dynamic_cart').css('visibility', 'visible').animate( { 
			marginTop : '20px', 
			opacity : 	1 
		}, 500);
		
		
		template.on('mouseenter cmsmasters_hide', function () { 
			template.animate( { 
				marginTop :	0, 
				opacity : 	0 
			}, 500, function () { 
				template.remove();
			} );
		} );
		
		
		setTimeout(function () { 
			template.trigger('cmsmasters_hide');
		}, 2000);
	}
}


var cmsmasters_added_product = {};

function cmsmasters_ajax_add_to_cart() {
	jQuery('.cmsmasters_add_to_cart_button').on('click', function() {	
		var productInfo = jQuery(this).parents('.product_inner'), 
			product = {};
			
		product.name = productInfo.find('.cmsmasters_product_title a').text();
		product.image = productInfo.find('figure img');
			
		if (product.image.length) {
			/* Dynamic Cart Update Img Src */
			var str = product.image.get(0).src, 
				ext = /(\..{3,4})$/i.exec(str), 
				extLength = ext[1].length, 
				url = str.slice(0, -extLength), 
				newURL = /(-\d{2,}x\d{2,})$/i.exec(url), 
				newSize = '-' + cmsmasters_woo_script.thumbnail_image_width + 'x' + cmsmasters_woo_script.thumbnail_image_height, 
				buildURL = '';


			if (newURL !== null) {
				buildURL += url.slice(0, -newURL[1].length) + newSize + ext[1];
			} else {
				buildURL += url + newSize + ext[1];
			}
			
			product.image = '<img class="cmsmasters_added_product_info_img" src="' + buildURL + '" />';
		}
			
		cmsmasters_added_product = product;
	});
}

