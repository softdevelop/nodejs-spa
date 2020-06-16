$(document).ready(function() {
    var eltdCoreAjaxUrl = "https://kendall.qodeinteractive.com/wp-admin/admin-ajax.php";
    var yith_wcwl_plugin_ajax_web_url = '/wp-admin/admin-ajax.php';
    var ElatedAjaxUrl = "https://kendall.qodeinteractive.com/wp-admin/admin-ajax.php";
    var gtm4wp_datalayer_name = "dataLayer";
    var dataLayer = dataLayer || [];
    window._wpemojiSettings = { "baseUrl": "https:\/\/s.w.org\/images\/core\/emoji\/12.0.0-1\/72x72\/", "ext": ".png", "svgUrl": "https:\/\/s.w.org\/images\/core\/emoji\/12.0.0-1\/svg\/", "svgExt": ".svg", "source": { "concatemoji": "https:\/\/kendall.qodeinteractive.com\/wp-includes\/js\/wp-emoji-release.min.js?ver=5.2.2" } };
    ! function(a, b, c) {
        function d(a, b) {
            var c = String.fromCharCode;
            l.clearRect(0, 0, k.width, k.height), l.fillText(c.apply(this, a), 0, 0);
            var d = k.toDataURL();
            l.clearRect(0, 0, k.width, k.height), l.fillText(c.apply(this, b), 0, 0);
            var e = k.toDataURL();
            return d === e
        }

        function e(a) {
            var b;
            if (!l || !l.fillText) return !1;
            switch (l.textBaseline = "top", l.font = "600 32px Arial", a) {
                case "flag":
                    return !(b = d([55356, 56826, 55356, 56819], [55356, 56826, 8203, 55356, 56819])) && (b = d([55356, 57332, 56128, 56423, 56128, 56418, 56128, 56421, 56128, 56430, 56128, 56423, 56128, 56447], [55356, 57332, 8203, 56128, 56423, 8203, 56128, 56418, 8203, 56128, 56421, 8203, 56128, 56430, 8203, 56128, 56423, 8203, 56128, 56447]), !b);
                case "emoji":
                    return b = d([55357, 56424, 55356, 57342, 8205, 55358, 56605, 8205, 55357, 56424, 55356, 57340], [55357, 56424, 55356, 57342, 8203, 55358, 56605, 8203, 55357, 56424, 55356, 57340]), !b
            }
            return !1
        }

        function f(a) {
            var c = b.createElement("script");
            c.src = a, c.defer = c.type = "text/javascript", b.getElementsByTagName("head")[0].appendChild(c)
        }
        var g, h, i, j, k = b.createElement("canvas"),
            l = k.getContext && k.getContext("2d");
        for (j = Array("flag", "emoji"), c.supports = { everything: !0, everythingExceptFlag: !0 }, i = 0; i < j.length; i++) c.supports[j[i]] = e(j[i]), c.supports.everything = c.supports.everything && c.supports[j[i]], "flag" !== j[i] && (c.supports.everythingExceptFlag = c.supports.everythingExceptFlag && c.supports[j[i]]);
        c.supports.everythingExceptFlag = c.supports.everythingExceptFlag && !c.supports.flag, c.DOMReady = !1, c.readyCallback = function() { c.DOMReady = !0 }, c.supports.everything || (h = function() { c.readyCallback() }, b.addEventListener ? (b.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1)) : (a.attachEvent("onload", h), b.attachEvent("onreadystatechange", function() { "complete" === b.readyState && c.readyCallback() })), g = c.source || {}, g.concatemoji ? f(g.concatemoji) : g.wpemoji && g.twemoji && (f(g.twemoji), f(g.wpemoji)))
    }(window, document, window._wpemojiSettings);
    var wc_add_to_cart_params = { "ajax_url": "\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/beauty-home\/?wc-ajax=%%endpoint%%", "i18n_view_cart": "View Cart", "cart_url": "https:\/\/kendall.qodeinteractive.com\/cart\/", "is_cart": "", "cart_redirect_after_add": "no" };
    var mejsL10n = { "language": "en", "strings": { "mejs.install-flash": "You are using a browser that does not have Flash player enabled or installed. Please turn on your Flash player plugin or download the latest version from https:\/\/get.adobe.com\/flashplayer\/", "mejs.fullscreen-off": "Turn off Fullscreen", "mejs.fullscreen-on": "Go Fullscreen", "mejs.download-video": "Download Video", "mejs.fullscreen": "Fullscreen", "mejs.time-jump-forward": ["Jump forward 1 second", "Jump forward %1 seconds"], "mejs.loop": "Toggle Loop", "mejs.play": "Play", "mejs.pause": "Pause", "mejs.close": "Close", "mejs.time-slider": "Time Slider", "mejs.time-help-text": "Use Left\/Right Arrow keys to advance one second, Up\/Down arrows to advance ten seconds.", "mejs.time-skip-back": ["Skip back 1 second", "Skip back %1 seconds"], "mejs.captions-subtitles": "Captions\/Subtitles", "mejs.captions-chapters": "Chapters", "mejs.none": "None", "mejs.mute-toggle": "Mute Toggle", "mejs.volume-help-text": "Use Up\/Down Arrow keys to increase or decrease volume.", "mejs.unmute": "Unmute", "mejs.mute": "Mute", "mejs.volume-slider": "Volume Slider", "mejs.video-player": "Video Player", "mejs.audio-player": "Audio Player", "mejs.ad-skip": "Skip ad", "mejs.ad-skip-info": ["Skip in 1 second", "Skip in %1 seconds"], "mejs.source-chooser": "Source Chooser", "mejs.stop": "Stop", "mejs.speed-rate": "Speed Rate", "mejs.live-broadcast": "Live Broadcast", "mejs.afrikaans": "Afrikaans", "mejs.albanian": "Albanian", "mejs.arabic": "Arabic", "mejs.belarusian": "Belarusian", "mejs.bulgarian": "Bulgarian", "mejs.catalan": "Catalan", "mejs.chinese": "Chinese", "mejs.chinese-simplified": "Chinese (Simplified)", "mejs.chinese-traditional": "Chinese (Traditional)", "mejs.croatian": "Croatian", "mejs.czech": "Czech", "mejs.danish": "Danish", "mejs.dutch": "Dutch", "mejs.english": "English", "mejs.estonian": "Estonian", "mejs.filipino": "Filipino", "mejs.finnish": "Finnish", "mejs.french": "French", "mejs.galician": "Galician", "mejs.german": "German", "mejs.greek": "Greek", "mejs.haitian-creole": "Haitian Creole", "mejs.hebrew": "Hebrew", "mejs.hindi": "Hindi", "mejs.hungarian": "Hungarian", "mejs.icelandic": "Icelandic", "mejs.indonesian": "Indonesian", "mejs.irish": "Irish", "mejs.italian": "Italian", "mejs.japanese": "Japanese", "mejs.korean": "Korean", "mejs.latvian": "Latvian", "mejs.lithuanian": "Lithuanian", "mejs.macedonian": "Macedonian", "mejs.malay": "Malay", "mejs.maltese": "Maltese", "mejs.norwegian": "Norwegian", "mejs.persian": "Persian", "mejs.polish": "Polish", "mejs.portuguese": "Portuguese", "mejs.romanian": "Romanian", "mejs.russian": "Russian", "mejs.serbian": "Serbian", "mejs.slovak": "Slovak", "mejs.slovenian": "Slovenian", "mejs.spanish": "Spanish", "mejs.swahili": "Swahili", "mejs.swedish": "Swedish", "mejs.tagalog": "Tagalog", "mejs.thai": "Thai", "mejs.turkish": "Turkish", "mejs.ukrainian": "Ukrainian", "mejs.vietnamese": "Vietnamese", "mejs.welsh": "Welsh", "mejs.yiddish": "Yiddish" } };
    var _wpmejsSettings = { "pluginPath": "\/wp-includes\/js\/mediaelement\/", "classPrefix": "mejs-", "stretching": "responsive" };
    var dataLayer_content = { "pagePostType": "page", "pagePostType2": "single-page", "pagePostAuthor": "Marine Williams" };
    dataLayer.push(dataLayer_content); //]]>
    //<![CDATA[
    (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src =
            '//www.googletagmanager.com/gtm.' + 'js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-KLJLSX7'); //]]>
    var htmlDiv = document.getElementById("rs-plugin-settings-inline-css");
    var htmlDivCss = "";
    if (htmlDiv) {
        htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
    } else {
        var htmlDiv = document.createElement("div");
        htmlDiv.innerHTML = "<style>" + htmlDivCss + "</style>";
        document.getElementsByTagName("head")[0].appendChild(htmlDiv.childNodes[0]);
    }
    var htmlDiv = document.getElementById("rs-plugin-settings-inline-css");
    var htmlDivCss = "";
    if (htmlDiv) {
        htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
    } else {
        var htmlDiv = document.createElement("div");
        htmlDiv.innerHTML = "<style>" + htmlDivCss + "</style>";
        document.getElementsByTagName("head")[0].appendChild(htmlDiv.childNodes[0]);
    }
    /******************************************
				-	PREPARE PLACEHOLDER FOR SLIDER	-
			******************************************/
    var setREVStartSize = function() {
        try {
            var e = new Object,
                i = jQuery(window).width(),
                t = 9999,
                r = 0,
                n = 0,
                l = 0,
                f = 0,
                s = 0,
                h = 0;
            e.c = jQuery('#rev_slider_12_1');
            e.responsiveLevels = [1920, 1441, 778, 480];
            e.gridwidth = [1200, 1100, 778, 480];
            e.gridheight = [625, 460, 550, 720];

            e.sliderLayout = "fullwidth";
            if (e.responsiveLevels && (jQuery.each(e.responsiveLevels, function(e, f) { f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e) }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) {
                var u = (e.c.width(), jQuery(window).height());
                if (void 0 != e.fullScreenOffsetContainer) { var c = e.fullScreenOffsetContainer.split(","); if (c) jQuery.each(c, function(e, i) { u = jQuery(i).length > 0 ? u - jQuery(i).outerHeight(!0) : u }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0)) }
                f = u
            } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight);
            e.c.closest(".rev_slider_wrapper").css({ height: f })

        } catch (d) { console.log("Failure at Presize of Slider:" + d) }
    };

    setREVStartSize();

    var tpj = jQuery;

    var revapi12;
    tpj(document).ready(function() {
        if (tpj("#rev_slider_12_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_12_1");
        } else {
            revapi12 = tpj("#rev_slider_12_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: "//kendall.qodeinteractive.com/wp-content/plugins/revslider/public/assets/js/",
                sliderLayout: "fullwidth",
                dottedOverlay: "none",
                delay: 5000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    arrows: {
                        style: "eltd-dark-skin",
                        enable: true,
                        hide_onmobile: true,
                        hide_under: 1025,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 20,
                            v_offset: 0
                        }
                    },
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "eltd-dark-skin",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 20,
                        space: 5,
                        tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-title"></span>'
                    }
                },
                responsiveLevels: [1920, 1441, 778, 480],
                visibilityLevels: [1920, 1441, 778, 480],
                gridwidth: [1200, 1100, 778, 480],
                gridheight: [625, 460, 550, 720],
                lazyType: "none",
                parallax: {
                    type: "mouse",
                    origo: "enterpoint",
                    speed: 6000,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                    type: "mouse",
                },
                shadow: 0,
                spinner: "spinner4",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
    }); /*ready*/
    var htmlDivCss = '	#rev_slider_12_1_wrapper .tp-loader.spinner4 div { background-color: #dea43e !important; } ';
    var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
    if (htmlDiv) {
        htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
    } else {
        var htmlDiv = document.createElement('div');
        htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
        document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
    }
    var htmlDivCss = unescape(".eltd-dark-skin.tparrows%20%7B%0A%09cursor%3Apointer%3B%0A%09width%3A%23%23bg-size%23%23px%3B%0A%09height%3A%23%23bg-size%23%23px%3B%0A%09position%3Aabsolute%3B%0A%09display%3Ablock%3B%0A%09z-index%3A100%3B%0A%20%20%20%20background-color%3A%20transparent%3B%0A%20%20%20%20font-weight%3Alight%3B%0A%7D%0A%0A.eltd-dark-skin.tparrows%3Abefore%20%7B%0A%09font-family%3A%20%22revicons%22%3B%0A%09font-size%3A45px%3B%0A%09color%3A%23000%3B%0A%09display%3Ablock%3B%0A%09text-align%3A%20center%3B%0A%7D%0A.eltd-dark-skin.tparrows.tp-leftarrow%3Abefore%20%7B%0A%09content%3A%20%22%5Ce03f%22%3B%0A%20%20%20font-family%3A%20%22fontawesome%22%20%21important%3B%0A%20%20%20%20margin-left%3A-3px%3B%0A%7D%0A.eltd-dark-skin.tparrows.tp-rightarrow%3Abefore%20%7B%0A%09%20%20%20%20content%3A%20%22%5Ce04b%22%3B%0A%20%20%20%20%20%20%20%20%20font-family%3A%20%22fontawesome%22%20%21important%3B%0A%20%20%20%20margin-right%3A-3px%3B%0A%7D%0A%0A.eltd-dark-skin.tparrows.tp-rightarrow%7B%0A%20%20%20%20transition%3A%20all%200.3s%20ease-in-out%3B%0A%20%20%20%20-webkit-transition%3A%20all%200.3s%20ease-in-out%3B%0A%7D%0A.eltd-dark-skin.tparrows.tp-leftarrow%7B%0A%20%20%20%20transition%3A%20all%200.3s%20ease-in-out%3B%0A%20%20%20%20-webkit-transition%3A%20all%200.3s%20ease-in-out%3B%0A%20%7D%0A%0A.rev_slider%20.eltd-dark-skin.tparrows.tp-leftarrow%20%7B%0A%20%20%20%20transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%20-30%2C%20-20%29%20%21important%3B%0A%20%20%20%20-webkit-transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%20-30%2C%20-20%29%20%21important%3B%0A%7D%0A%0A.rev_slider%20.eltd-dark-skin.tparrows.tp-rightarrow%20%7B%0A%20%20%20%20transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%200%2C%20-20%29%20%21important%3B%0A%20%20%20%20-webkit-transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%200%2C%20-20%29%20%21important%3B%0A%7D%0A%0A.rev_slider%3Ahover%20.eltd-dark-skin.tparrows.tp-leftarrow%20%7B%0A%20%20%20%20transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%2020%2C%20-20%29%20%21important%3B%0A%20%20%20%20-webkit-transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%2020%2C%20-20%29%20%21important%3B%0A%7D%0A%0A.rev_slider%3Ahover%20.eltd-dark-skin.tparrows.tp-rightarrow%20%7B%0A%20%20%20%20transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%20-60%2C%20-20%29%20%21important%3B%0A%20%20%20%20-webkit-transform%3Amatrix%281%2C%200%2C%200%2C%201%2C%20-60%2C%20-20%29%20%21important%3B%0A%7D%0A.tp-bullets.eltd-dark-skin%7B%0A%09top%3A99%25%21important%3B%0A%20%20%20%20width%3Aauto%21important%3B%0A%7D%0A.eltd-dark-skin.tp-bullets%20.tp-bullet%7B%0A%20%20border-radius%3A50%25%3B%0A%20%20background-color%3Atransparent%3B%0A%20%20border%3A2px%20solid%20%23333%3B%0A%20%20box-sizing%3Aborder-box%3B%0A%20%20width%3A10px%3B%0A%20%20height%3A10px%3B%0A%20%20position%3A%20relative%3B%0A%20%20float%3Aleft%3B%0A%20%20margin-left%3A%2010px%21important%3B%0A%20%20left%3A0%21important%3B%0A%0A%7D%0A.eltd-dark-skin.tp-bullets%20.tp-bullet.selected%2C%0A.eltd-dark-skin.tp-bullets%20.tp-bullet%3Ahover%7B%0Abackground-color%3A%23333%3B%0A%7D%0A.eltd-dark-skin.tp-bullets%20.tp-bullet%3Afirst-child%7B%0Amargin-left%3A%200px%21important%3B%0A%7D%0A%0A%0A");
    var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
    if (htmlDiv) {
        htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
    } else {
        var htmlDiv = document.createElement('div');
        htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
        document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
    }

    function revslider_showDoubleJqueryError(sliderID) {
        var errorMessage = "Revolution Slider Error: You have some jquery.js library include that comes after the revolution files js include.";
        errorMessage += "<br> This includes make eliminates the revolution slider libraries, and make it not work.";
        errorMessage += "<br><br> To fix it you can:<br>&nbsp;&nbsp;&nbsp; 1. In the Slider Settings -> Troubleshooting set option:  <strong><b>Put JS Includes To Body</b></strong> option to true.";
        errorMessage += "<br>&nbsp;&nbsp;&nbsp; 2. Find the double jquery.js include and remove it.";
        errorMessage = "<span style='font-size:16px;color:#BC0C06;'>" + errorMessage + "</span>";
        jQuery(sliderID).show().html(errorMessage);
    }
    var wpcf7 = { "apiSettings": { "root": "https:\/\/kendall.qodeinteractive.com\/wp-json\/contact-form-7\/v1", "namespace": "contact-form-7\/v1" }, "cached": "1" };
    var woocommerce_params = { "ajax_url": "\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/beauty-home\/?wc-ajax=%%endpoint%%" };
    var wc_cart_fragments_params = { "ajax_url": "\/wp-admin\/admin-ajax.php", "wc_ajax_url": "\/beauty-home\/?wc-ajax=%%endpoint%%", "fragment_name": "wc_fragments" };
    var yith_wcwl_l10n = { "ajax_url": "\/wp-admin\/admin-ajax.php", "redirect_to_cart": "no", "multi_wishlist": "", "hide_add_button": "1", "is_user_logged_in": "", "ajax_loader_url": "https:\/\/kendall.qodeinteractive.com\/wp-content\/plugins\/yith-woocommerce-wishlist\/assets\/images\/ajax-loader.gif", "remove_from_wishlist_after_add_to_cart": "yes", "labels": { "cookie_disabled": "We are sorry, but this feature is available only if cookies are enabled on your browser.", "added_to_cart_message": "<div class=\"woocommerce-message\">Product correctly added to cart<\/div>" }, "actions": { "add_to_wishlist_action": "add_to_wishlist", "remove_from_wishlist_action": "remove_from_wishlist", "move_to_another_wishlist_action": "move_to_another_wishlsit", "reload_wishlist_and_adding_elem_action": "reload_wishlist_and_adding_elem" } };
    jQuery(document).ready(function(jQuery) { jQuery.datepicker.setDefaults({ "closeText": "Close", "currentText": "Today", "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], "nextText": "Next", "prevText": "Previous", "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], "dayNamesMin": ["S", "M", "T", "W", "T", "F", "S"], "dateFormat": "MM d, yy", "firstDay": 1, "isRTL": false }); });

});