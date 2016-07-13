(function($) {
    "use strict";

    // Stop divi header from shrinking.
    // https://divibooster.com/stop-the-divi-header-from-shrinking-on-scroll/
    // Override the addClass to prevent fixed header class from being added
    var addclass = jQuery.fn.addClass;
    jQuery.fn.addClass = function(){
        var result = addclass.apply(this, arguments);
        jQuery('#main-header').removeClass('et-fixed-header');
        return result;
    }

    $('#main-header').removeClass('et-fixed-header');

})(jQuery);
