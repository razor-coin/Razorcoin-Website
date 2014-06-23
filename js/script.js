
(function($) {
    "use strict";

    $(document).ready(function() {

        function getImgSize(el, imgSrc) {
            var newImg = new Image();

            newImg.onload = function() {
                var height = newImg.height;
                var width = newImg.width;


                el.css('height', height);

            };

            newImg.src = imgSrc;
        }


        $('.tabs-buttons a').click(function() {
            $(this).parent().parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });

        if ($('*').find("[data-background-image]").length > 0) {
            $('*').find("[data-background-image]").each(function() {
                var el = $(this);
                getImgSize(el, el.attr("data-background-image"));

                el.css('background-position', 'center').css('background-image', "url('" + el.attr("data-background-image") + "')").css('background-size', 'cover').css('background-repeat', 'no-repeat');

            });
        }
        if ($('*').find("[data-txt-color]").length > 0) {
            $('*').find("[data-txt-color]").each(function() {
                var el = $(this);
                el.find('*').css('color', el.attr("data-txt-color"));
                el.find('.le-link').css('border-color', el.attr("data-txt-color"));
            });
        }


        if ($('*').find("[data-bg-color]").length > 0) {
            $('*').find("[data-bg-color]").each(function() {
                var el = $(this);
                el.css('background-color', el.attr("data-bg-color"));
            });
        }

        if ($('.item-slide-holder').length > 0) {
            $('.item-slide-holder .the-slider').carouFredSel({
                auto: true,
                responsive: true,
                pagination: ".pagination-bullets"
            });
        }



      
        if ($("[data-bgcolor]").length > 0) {
            $("[data-bgcolor]").each(function() {

                $(this).css('background-color', $(this).attr('data-bgcolor'));
            });
        }
        if ($("[data-bg]").length > 0) {
            $("[data-bg]").each(function() {

                $(this).css('background-image', 'url(' + $(this).attr('data-bg') + ')');

            });
        }

        $('.top-drop-menu').change(function() {
            var loc = ($(this).find('option:selected').val());
            window.location = loc;

        });

        setupHomeSlider();

        function setupHomeSlider() {


            if ($('.homeslider.flexslider').length > 0) {
                var homeslider = $('.homeslider').flexslider({
                    prevText: "",
                    nextText: "",
                    smoothHeight: true,
                    directionNav: false,
                    controlNav: false,
                    slideshow: false,
                    start: function(slider) {
                        $('.homeslider').find('.preloader').removeClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);




                    },
                    after: function(slider) {
                        $('.homeslider').find('.preloader').removeClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);



                    },
                    before: function(slider) {
                        $('.homeslider').find('.preloader').addClass('loading');
                        var cs = slider.find('.slide').eq(slider.currentSlide);




                    }
                });
                $('.homeslider .flex-prev,.homeslider .flex-next').on('click', function() {
                    var href = $(this).attr('href');

                    homeslider.flexslider(href);
                    return false;
                });
            }

        }




        $('[data-placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('data-placeholder')) {
                input.val('');

            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('data-placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('data-placeholder'));
            }
        }).blur();

        $('[data-placeholder]').parents('form').submit(function() {
            $(this).find('[data-placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('data-placeholder')) {
                    input.val('');
                }
            });
        });


    });


    $('.tab-pane.active .product-mini-gallery').carouFredSel({
        auto: false
    });


    $('.le-select .dropdown-menu a').bind('click', function(e) {
        e.preventDefault();
        var el = $(this);
        console.log(el.parent().parent().parent('.dropdown-toggle'), el.text());
        el.parent().parent().parent().find('.dropdown-toggle').text(el.text());
        el.parent().parent().parent().find('input[type="hidden"]').attr('value', el.attr('data-value'));
    });
    
    
    //Contact form setup

    checkContactForm();
    function checkContactForm() {
        if ($(".contact-form").length > 0) {


            //  triggers contact form validation
            var formStatus = $(".contact-form").validate();
            //   ===================================================== 
            //sending contact form
            $(".contact-form").submit(function(e) {
                e.preventDefault();

                if (formStatus.errorList.length === 0)
                {
                    $(".contact-form .submit").fadeOut(function() {
                        $('#loading').css('display', 'block');
                        $.post('submit.php', $(".contact-form").serialize(),
                                function(data) {
                                   // $(".contact-form input,.contact-form textarea").not('.submit').val('');

                                    $('.message-box').html(data);


                                    $('#loading').css('display', 'none');
                                    $(".contact-form .submit").removeClass('disabled').css('display', 'block');
                                }

                        );
                    });


                }

            });
        }
    }

})(jQuery);