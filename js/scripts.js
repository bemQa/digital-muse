let scrollTop = $(window).scrollTop();

$(window).scroll(function (evt) {
    scrollTop = $(this).scrollTop();
});

$(document).ready(function () {
    // якоря для ссылок
    $('body').on('click', '.anchor[href^="#"]', function () {
        $('.header').removeClass('active');
        $('.menu').removeClass('active');

        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top - 150;
        $('html, body').animate({
            scrollTop: destination
        }, 500, 'swing');
        return false;
    });

    // аккордеон
    function openAccordion() {
        let wrap = $('.accordion-wrap');
        let accordion = wrap.find('.accordion-title');

        accordion.on('click', function () {
            let $this = $(this);
            let $parent = $(this).parent();
            let content = $this.next();

            if (content.is(':visible')) {
                $this.removeClass('active');
                $parent.removeClass('active');
                content.slideUp('fast');
            } else {
                $this.addClass('active');
                $parent.addClass('active');
                content.slideDown('fast');
            }

        });
    }
    openAccordion();

    // маски
    if ($('.phone-mask').length) {
        $('.phone-mask').inputmask({
            mask: "+79999999999",
            "clearIncomplete": true
        });
    }

    // открытие модалок
    $('body').on('click','.js-open-modal', function(e){
        e.preventDefault();
        let id = $(this).attr('href');
        Fancybox.show(
            [{src: id}],
            {
                defaultType: "inline", 
                // dragToClose: false,
                // touchMove: false,
                // backdropClick: false
            }
        );
    });

    Fancybox.bind("[data-fancybox]", {
        defaultType: "inline",
        // dragToClose: false,
        // touchMove: false,
        // backdropClick: false
    });

    // тултипы
    $('body').on('click', '.tooltip-trigger', function(e){
        e.preventDefault();
        let $this = $(this);
        let tooltip = $this.siblings('.tooltip');
        tooltip.toggleClass('show');
        $('body').on('click', function (e) {
            let div = $($this, tooltip);

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                tooltip.removeClass('show');
            }
        });
    });

    // фронтовая валидация форм
    function checkValidate() {
        let form = $('.form');
    
        $.each(form, function () {
            $(this).validate({
                ignore: [],
                errorClass: 'error',
                validClass: 'success',
                errorElement : 'span',
                rules: {
                    name: {
                        required: true 
                    },
                    email: {
                        required: true,
                        email: true 
                    },
                    phone: {
                        required: true,
                        phone: true 
                    },
                    message: {
                        required: true 
                    },
                    password: {
                        required: true,
                        normalizer: function normalizer(value) {
                            return $.trim(value);
                        }
                    }
                },
                errorPlacement: function(error, element) {
                    let parent = $(element).parent();
                    var placement = $(element).data('error');
                    if (placement) {
                        $(placement).append(error);
                    } else {
                        error.appendTo(parent);
                    }
                },
                messages: {
                    required: "Заполните обязательное поле",
                    phone: 'Некорректный номер',
                    email: 'Некорректный e-mail'
                } 
            });
        });
        jQuery.validator.addMethod('email', function (value, element) {
            return this.optional(element) || /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
        });
        jQuery.validator.addMethod('phone', function (value, element) {
            return this.optional(element) || /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/.test(value);
        });
    }
    if($('.form').length) {
        checkValidate();
    }

    // цвет шапки определяем в зависимости от цвета блока идущего после неё
    let next_section = $('.header').next('.section');
    if(next_section.hasClass('bg-light')) {
        $('.header').addClass('header-dark-text');
    } else {
        $('.header').removeClass('header-dark-text');
    }

    // slider
    const text_page_slider = new Swiper('.text-page-slider', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // const product_slider_navs = new Swiper(".text-page-slider-navs", {
    //     slidesPerView: 4,
    //     loop: true,
    //     freeMode: true,
    //     watchSlidesProgress: true,
    //     grabCursor: true,
    // });
    // const product_slider = new Swiper(".text-page-slider", {
    //     slidesPerView: 'auto',
    //     loop: true,
    //     spaceBetween: 8,
    //     thumbs: {
    //         swiper: product_slider_navs,
    //     },
    //     breakpoints: {
    //         481: {
    //             direction: "vertical",
    //             spaceBetween: 16,
    //         },
    //     },
    // });
});