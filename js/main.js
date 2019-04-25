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
    });

    $(".claim").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#product-list-headline").offset().top
        }, 800);
    });

    $("#more_button").click(function() {
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

    //let slider = $('.w3-display-container');
    /*if(slider) {
        showDivs(slider, $.data(slider, "slideIndex"));
        $('#sliderBannerLeft').click(function () {
            plusDivs($('.w3-display-container'), -1)
        });
        $('#sliderBannerRight').click(function () {
            plusDivs($('.w3-display-container'), 1)
        });
        $('.sliderDot').click(function(){
            currentDiv(this.data("slideIndex"));
        })
    }*/

    function plusDivs(slider, n) {
        if(slider) {
            slider.data("slideIndex", slider.data("slideIndex") + n);
            showDivs(slider, slider.data("slideIndex"));
        }
    }

    function currentDiv(slider, n) {
        if(slider) {
            slider.data("slideIndex", n);
            showDivs(slider, $.data(slider, "slideIndex"));
        }
    }

    function showDivs(slider, n) {
        let i;
        const x = document.getElementsByClassName("mySlides");
        const dots = document.getElementsByClassName("demo");
        if (n > x.length) {slider.data("slideIndex", 1)}
        if (n < 1) {slider.data("slideIndex",  x.length)}
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" w3-white", "");
        }
        x[slider.data("slideIndex")-1].style.display = "block";
        dots[slider.data("slideIndex")-1].className += " w3-white";
    }
})(jQuery);