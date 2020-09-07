(function ($) {
    function initMobileMenu() {
        var $mainArea = $('#et-main-area');
        var $menuButton = $('.mobile_menu_bar_toggle');

        $menuButton.on('click', function (event) {
            event.preventDefault();

            if ($(event.currentTarget).hasClass('opened')) {
                animateLogo();
                $mainArea.show();
                $(event.currentTarget).removeClass('opened');
            } else {
                animateLogo();
                $mainArea.hide();
                $(event.currentTarget).addClass('opened');
            }
        });
    }

    function animateLogo() {
        var $logo = $('.logo_container');

        $logo.animate({
            top: '-50px'
        }, 'fast', function () {
            window.setTimeout(function () {
                $logo.animate({
                    top: '0px'
                }, 'fast');
            }, 500);
        });
    }

    $(window).load(function () {
        initMobileMenu();
    });
})(jQuery);
