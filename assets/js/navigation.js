jQuery(document).ready(function($) {
  var mainMenu = $('#hsc-main-menu');
  var menuButton = mainMenu.find('.mobile_menu_bar');
  var contentArea = $('#et-main-area');
  var mobileMenuCssClass = 'is-mobile-menu-open';

  $(menuButton).on('click', function() {
    if (contentArea.hasClass(mobileMenuCssClass)) {
      contentArea.removeClass(mobileMenuCssClass);
      contentArea.css('height', '100%');
    } else {
      contentArea.addClass(mobileMenuCssClass);
      contentArea.css('height', mainMenu.find('.et_mobile_menu').height());
    }
  });
});
