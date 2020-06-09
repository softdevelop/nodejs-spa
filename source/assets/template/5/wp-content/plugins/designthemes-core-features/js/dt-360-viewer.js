(function ($) {

	$.fn.extend({

        dt360Viewer: function(params) {
            dt360Viewer(this.selector, params);
            return
        }

    });

    var dt360Viewer = function (selectorName, params) {

    	this.selector = $(selectorName);
    	this.totalImages = params.totalImages;
    	this.isMoving = false;
    	this.currentX = 0;
    	this.currentImage = 1;

    	function validateUserAction() {

            selector.mousedown(function(target) {
                isMoving = true;
                currentX = target.pageX - this.offsetLeft;
            });

            $(document).mouseup(function() {
                isMoving = false;
            });

            selector.mousemove(function(target) {
                if (isMoving == true) {
                	loadImage(target.pageX - this.offsetLeft);
                }
            });

            selector.bind('touchstart', function(target) {
             	isMoving = true;
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                currentX = actualTouch.clientX;
            });

            $(document).bind('touchend', function() {
                isMoving = false;
            });

            selector.bind('touchmove', function(target) {
                target.preventDefault();
                var actualTouch = target.originalEvent.touches[0] || target.originalEvent.changedTouches[0];
                if (isMoving == true) {
                	loadImage(actualTouch.pageX - this.offsetLeft);
                } else {
                	currentX = actualTouch.pageX - this.offsetLeft
                }
            });

        }

        function loadImage(newX) {

            if (currentX - newX > 25 ) {

                currentX = newX;
                currentImage = --currentImage < 1 ? totalImages : currentImage;

                var img_src = selector.find('img[data-index='+currentImage+']' ).attr('src');

                selector.css('background-image', 'url(' + img_src + ')');

            } else if (currentX - newX < -25) {

                currentX = newX;
                currentImage = ++currentImage > totalImages ? 1 : currentImage;  

                var img_src = selector.find('img[data-index='+currentImage+']' ).attr('src');

                selector.css('background-image', 'url(' + img_src + ')');

            }
            
        }

        function initialSetup() {

            var initial_img_src = selector.find('img[data-index=1]' ).attr('src');
            var initial_img_height = selector.find('img[data-index=1]' ).attr('height');
            var initial_img_width = selector.find('img[data-index=1]' ).attr('width');
            selector.css('background-image', 'url('+initial_img_src+')').height(initial_img_height).width(initial_img_width);

        }

        initialSetup();
        validateUserAction();

    }
 
})(jQuery);