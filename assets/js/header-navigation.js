class HeaderNavigation {
  SELECTORS = {
    menuButton: 'hsc--menu-toggle',
    overlay: 'hsc--menu-overlay',
    backdrop: 'hsc--menu-backdrop',
    subMenuToggle: '.hsc--subnav-toggle',
    activeMenuParent: '.current-menu-parent',
    toolbar: 'hsc-header-nav-toolbar',
    desktopMenu: 'hsc-header-nav-desktop',
  };

  CLASSES = {
    active: 'active',
    sticky: 'is-sticky',
  };

  isMobileDevice = ('ontouchstart' in window || navigator.maxTouchPoints);
  clickEventType = !this.isMobileDevice ? 'tap' : 'click';

  constructor() {
    this.addMenuButtonClickEvent();
    this.addSubMenuClickEvents();
    this.addMenuStickyListener();
  }

  /**
   *
   */
  addMenuStickyListener() {
    const toolbar = document.getElementById(this.SELECTORS.toolbar);
    const desktopMenu = document.getElementById(this.SELECTORS.desktopMenu);

    window.addEventListener('scroll', () => {
      if (window.scrollY >= toolbar.offsetHeight) {
        desktopMenu.classList.add(this.CLASSES.sticky);
      } else {
        desktopMenu.classList.remove(this.CLASSES.sticky);
      }
    });
  }

  /**
   *
   */
  addMenuButtonClickEvent() {
    document.getElementById(this.SELECTORS.menuButton).addEventListener('click',(event) => {
      this.onMenuButtonClicked();
    });
  }

  onMenuButtonClicked() {
    document.getElementById(this.SELECTORS.overlay).scrollTop = 0;
    this.toggleOverlayActiveClass();
    this.setInitActiveStateToMenu();

    // Add event listener to hide the overlay again.
    document.getElementById(this.SELECTORS.backdrop).addEventListener(
      'click',
      () => this.toggleOverlayActiveClass(),
      { once: true }
    );
  }

  /**
   *
   */
  addSubMenuClickEvents() {
    document.querySelectorAll(this.SELECTORS.subMenuToggle).forEach((button) => {
      button.addEventListener('click', (event) => {
        this.toggleSubNavAccordion(event.target.nextElementSibling, event.target);
      });
    });
  }

  /**
   *
   */
  setInitActiveStateToMenu() {
    document.querySelectorAll(this.SELECTORS.activeMenuParent).forEach((button) => {
      button.classList.toggle(this.CLASSES.active);
      const menuToggle = button.querySelector(this.SELECTORS.subMenuToggle);
      const subNav = menuToggle.nextElementSibling;

      this.toggleSubNavAccordion(subNav, menuToggle);
    });
  }

  /**
   *
   */
  toggleOverlayActiveClass() {
    document.getElementById(this.SELECTORS.menuButton).classList.toggle(this.CLASSES.active);
    document.getElementById(this.SELECTORS.overlay).classList.toggle(this.CLASSES.active);
    document.getElementById(this.SELECTORS.backdrop).classList.toggle(this.CLASSES.active);
    document.body.style.overflow = document.body.style.overflow === 'hidden' ? null : 'hidden';
  }

  /**
   *
   */
  toggleSubNavAccordion(subNav, button) {
    const currentMaxHeight = subNav.style.maxHeight;
    const maxHeight = subNav.scrollHeight + 'px';

    button.classList.toggle(this.CLASSES.active);
    subNav.classList.toggle(this.CLASSES.active);
    subNav.style.maxHeight = currentMaxHeight ? null : maxHeight;
  }
}

const headerNavigation = new HeaderNavigation();
