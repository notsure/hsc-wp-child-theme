class Navigation {
  SELECTORS = {
    desktopToolbar: '#hsc-header-nav-toolbar',
    desktopMenu: '#hsc-header-nav-desktop',
    mobileMenuButton: '#hsc--menu-toggle',
    mobileMenu: '#hsc-header-nav-mobile',
    mobileMenuOverlay: '#hsc--menu-overlay',
    backdrop: '#hsc--menu-backdrop',
    subMenuToggle: '.hsc--subnav-toggle',
    activeMenuParent: '.current-menu-parent',
  };

  CLASSES = {
    active: 'active',
    hide: 'hide',
    sticky: 'is-sticky',
    noScroll: 'no-scroll',
  };

  constructor() {
    this.lastScrollTop = 0; // To track the last scroll position
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.cacheElements();
      this.bindEventListeners();
      this.checkInitialScrollPosition();
    });
  }

  cacheElements() {
    this.mobileMenuButton = document.querySelector(this.SELECTORS.mobileMenuButton);
    this.mobileMenuOverlay = document.querySelector(this.SELECTORS.mobileMenuOverlay);
    this.backdrop = document.querySelector(this.SELECTORS.backdrop);
    this.desktopToolbar = document.querySelector(this.SELECTORS.desktopToolbar);
    this.desktopMenu = document.querySelector(this.SELECTORS.desktopMenu);
    this.mobileMenu = document.querySelector(this.SELECTORS.mobileMenu);
  }

  bindEventListeners() {
    this.mobileMenuButton?.addEventListener('click', () => this.onMenuButtonClicked());
    this.backdrop?.addEventListener('click', () => this.toggleOverlayActiveClass(), { once: true });

    document.querySelectorAll(this.SELECTORS.subMenuToggle).forEach(button => {
      button.addEventListener('click', event => this.onSubMenuToggleClick(event));
    });

    if (this.desktopToolbar && this.desktopMenu && this.mobileMenu) {
      window.addEventListener('scroll', this.throttle(() => this.onWindowScroll(), 100));
    }
  }

  checkInitialScrollPosition() {
    this.updateDesktopClasses();
  }

  throttle(fn, limit) {
    let lastCall = 0;

    return function (...args) {
      const now = (new Date()).getTime();
      if (now - lastCall >= limit) {
        lastCall = now;
        fn.apply(this, args);
      }
    };
  }

  onWindowScroll() {
    this.updateDesktopClasses();
    this.updateMobileClasses();
  }

  updateDesktopClasses() {
    const shouldStick = window.scrollY > this.desktopToolbar.offsetHeight;

    this.desktopMenu.classList.toggle(this.CLASSES.sticky, shouldStick);
  }

  updateMobileClasses() {
    const currentScrollTop = window.scrollY;

    // Remove the hide class when at the top of the page.
    if (currentScrollTop <= 0) {
      this.mobileMenu.classList.remove(this.CLASSES.hide);
    } else if (currentScrollTop > this.lastScrollTop && currentScrollTop > this.mobileMenu.offsetHeight) {
      // Scrolling down and the current scroll position is greater than the mobileMenu height.
      this.mobileMenu.classList.add(this.CLASSES.hide);
    } else if (currentScrollTop < this.lastScrollTop) {
      // Scrolling up.
      this.mobileMenu.classList.remove(this.CLASSES.hide);
    }

    this.lastScrollTop = currentScrollTop; // Update last position.
  }

  onMenuButtonClicked() {
    this.mobileMenuOverlay.scrollTop = 0;
    this.toggleOverlayActiveClass();
    this.setInitActiveStateToMenu();
  }

  onSubMenuToggleClick(event) {
    const subNav = event.target?.nextElementSibling;

    if (subNav) {
      this.toggleSubNavAccordion(subNav, event.target);
    }
  }

  setInitActiveStateToMenu() {
    const activeMenuParents = document.querySelectorAll(this.SELECTORS.activeMenuParent);

    activeMenuParents.forEach(parent => {
      const toggleButton = parent.querySelector(this.SELECTORS.subMenuToggle);

      if (toggleButton && toggleButton.nextElementSibling) {
        this.toggleSubNavAccordion(toggleButton.nextElementSibling, toggleButton);
      }
    });
  }

  toggleOverlayActiveClass() {
    if (this.mobileMenuButton && this.mobileMenuOverlay && this.backdrop) {
      const isActive = this.mobileMenuOverlay.classList.toggle(this.CLASSES.active);

      this.mobileMenuButton.classList.toggle(this.CLASSES.active, isActive);
      this.backdrop.classList.toggle(this.CLASSES.active, isActive);
      document.body.classList.toggle(this.CLASSES.noScroll, isActive);
    }
  }

  toggleSubNavAccordion(subNav, button) {
    const isExpanded = subNav.classList.contains(this.CLASSES.active);

    button.classList.toggle(this.CLASSES.active, !isExpanded);
    subNav.classList.toggle(this.CLASSES.active, !isExpanded);
    subNav.style.maxHeight = isExpanded ? '' : `${subNav.scrollHeight}px`;
  }
}

new Navigation();
