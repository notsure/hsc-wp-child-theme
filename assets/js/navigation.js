jQuery(document).ready(function($) {
  class MobileMenu {
    SELECTORS = {
      menuContainer: '#hsc-main-menu-mobile',
      menuButton: '.mobile_menu_bar',
      subMenu: '.sub-menu',
      contentArea: '#et-main-area',
      mobileMenuHolder: '.et_mobile_menu',
      hasItemChildren: '.menu-item-has-children'
    };

    mobileMenuCssClass = 'is-mobile-menu-open';
    menuHeight = 77;

    diviContentArea = $(this.SELECTORS.contentArea);
    menuButton = $(`${this.SELECTORS.menuContainer} ${this.SELECTORS.menuButton}`);
    menuContainer = $(`${this.SELECTORS.menuContainer} ${this.SELECTORS.mobileMenuHolder}`);
    accordionItems = this.menuContainer.find(`${this.SELECTORS.hasItemChildren}`);

    constructor() {
      this.setClickEventToMenuButton();
      this.addAccordionEventListener();
    }

    setClickEventToMenuButton() {
      this.diviContentArea.on('click', () => {
        this.diviContentArea.removeClass(this.mobileMenuCssClass);
        this.diviContentArea.css('height', '100%');
      });

      this.menuButton.on('click', () => {
        if (this.diviContentArea.hasClass(this.mobileMenuCssClass)) {
          this.diviContentArea.removeClass(this.mobileMenuCssClass);
          this.diviContentArea.css('height', '100%');
        } else {
          this.diviContentArea.addClass(this.mobileMenuCssClass);
          this.diviContentArea.css('height', this.menuContainer.height() + this.menuHeight);
        }
      });
    }

    addAccordionEventListener() {
      this.accordionItems.each((index, element) => {
        const linkTag = $(element).find('a')[0];
        $(linkTag).unbind();

        linkTag.addEventListener('click', (event) => {
          let subMenu = $(element).find(this.SELECTORS.subMenu);
          $(linkTag).toggleClass('active');
          $(subMenu).toggleClass('active');

          if (!subMenu.length) {
            return;
          }

          subMenu = subMenu[0];
          subMenu.style.maxHeight = subMenu.style.maxHeight ? null : subMenu.scrollHeight + 'px';
        });
      });
    }
  }

  const sponsorGridAnimated = new MobileMenu();
});
