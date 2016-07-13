(function($) {
    // function setup_collapsible_submenus() {
    //     var $menu = $('#mobile_menu');
    //     var top_level_link = '#mobile_menu .menu-item-has-children > a';

    //     $menu.find('a').each(function() {
    //         $(this).off('click');

    //         if ($(this).is(top_level_link)) {
    //             $(this).attr('href', '#');
    //         }

    //         if (!$(this).siblings('.sub-menu').length) {
    //             $(this).on('click', function(event) {
    //                 $(this).parents('.mobile_nav').trigger('click');
    //             });
    //         } else {
    //             $(this).on('click', function(event) {
    //                 event.preventDefault();
    //                 $(this).parent().toggleClass('visible');
    //             });
    //         }
    //     });
    // }

    function initMobileMenu() {
        var $mainArea = $('#et-main-area');
        var $menuButton = $('.mobile_menu_bar_toggle');

        $menuButton.on('click', function(event) {
            if ($(event.currentTarget).hasClass('opened')) {
                $mainArea.show();
                $(event.currentTarget).removeClass('opened');
            } else {
                $mainArea.hide();
                $(event.currentTarget).addClass('opened');
            }
        });
    }

    $(window).load(function() {
        // setTimeout(function() {
        //     setup_collapsible_submenus();
        // }, 700);

        initMobileMenu();
    });
})(jQuery);

