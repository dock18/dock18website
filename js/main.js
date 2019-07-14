/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

import jQuery from 'jquery';
import breakpoints from './breakpoints.min.js';
import browser from './browser.min.js';
import 'workbox-sw/build/workbox-sw.js';
import './jquery.scrollex.min';
import './jquery.scrolly.min.js';
import './util.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.min';
import 'slick-lightbox/dist/slick-lightbox.min';

(function ($) {

    var $window = $(window),
        $body = $('body'),
        $wrapper = $('#page-wrapper'),
        $banner = $('#banner'),
        $header = $('#header');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: ['481px', '736px'],
        xsmall: [null, '480px']
    });

    // Play initial animations on page load.
    $window.on('load', function () {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/dist/sw.js');
        }
        $body.removeClass('is-preload');
        AOS.init();

        $('#slick-product').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
            nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>'
        });
        $('#slick-product').slickLightbox({
            src: 'src',
            itemSelector: '.item img'
        });

        $('.headline-arrow').click(function() {
           $(this).toggleClass('is-open');
        });
    });

    $("#claim_tee").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".Tea").offset().top
        }, 800);
    });

    $("#claim_coffee").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".Coffee").offset().top
        }, 800);
    });

    $("#more_button").click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#product-list-headline").offset().top
        }, 800);
    });

    // Mobile?
    if (browser.mobile)
        $body.addClass('is-mobile');
    else {

        breakpoints.on('>medium', function () {
            $body.removeClass('is-mobile');
        });

        breakpoints.on('<=medium', function () {
            $body.addClass('is-mobile');
        });

    }

    // Scrolly.
    $('.scrolly')
        .scrolly({
            speed: 1500,
            offset: $header.outerHeight()
        });


    // Menu.
    $('#menu')
        .append("<a href=\"#menu\" class=\"close\"></a>")
        .appendTo($body)
        .panel({
            delay: 500,
            hideOnClick: true,
            hideOnSwipe: true,
            resetScroll: true,
            resetForms: true,
            side: 'right',
            target: $body,
            visibleClass: 'is-menu-visible'
        });

    // Header.
    if ($banner.length > 0
        && $header.hasClass('alt')) {

        $window.on('resize', function () {
            $window.trigger('scroll');
        });

        $banner.scrollex({
            bottom: $header.outerHeight() + 1,
            terminate: function () {
                $header.removeClass('alt');
            },
            enter: function () {
                $header.addClass('alt');
            },
            leave: function () {
                $header.removeClass('alt');
            }
        });

    }
})(jQuery);