class NewsSlider {
  constructor() {
    this.sliderAutoPlayDuration = 6000;
    this.autoSlideInterval = null;
    this.slidesContainer = document.getElementById('hsc--slider-container');
    this.slides = document.getElementsByClassName('hsc--slide');
    this.prevButton = document.getElementById('hsc--slider-arrow-prev');
    this.nextButton = document.getElementById('hsc--slider-arrow-next');
    this.paginationItems = document.getElementsByClassName('hsc--pagination-item');
    this.selectedSlide = 0;
    this.amountSlides = this.slides.length;
  }

  init() {
    if (!this.slidesContainer) {
      return;
    }

    this.slideWidth = this.slides[0].clientWidth;
    this.addButtonEventListeners();
    this.addPaginationEvents();
    this.updatePagination();
    this.startAutoSlide();

    window.addEventListener('resize', this.throttle(() => {
      this.startAutoSlide();
      this.slideWidth = this.slides[0].clientWidth;
    }, 250));
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  startAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(this.selectNextSlide.bind(this), this.sliderAutoPlayDuration);
  }

  addButtonEventListeners() {
    this.nextButton.addEventListener('click', this.stopAndAdvance.bind(this));
    this.prevButton.addEventListener('click', this.regressSlide.bind(this));
  }

  stopAndAdvance() {
    clearInterval(this.autoSlideInterval);
    this.selectNextSlide();
  }

  regressSlide() {
    clearInterval(this.autoSlideInterval);
    this.moveSlideBy(-1);
  }

  addPaginationEvents() {
    Array.from(this.paginationItems).forEach((item, index) => {
      item.addEventListener('click', this.stopAndSelect.bind(this, index));
    });
  }

  stopAndSelect(index) {
    clearInterval(this.autoSlideInterval);
    this.selectedSlide = index;
    this.slidesContainer.scrollLeft = this.slideWidth * index;
    this.updatePagination();
  }

  moveSlideBy(step) {
    this.selectedSlide = Math.max(0, Math.min(this.amountSlides - 1, this.selectedSlide + step));
    this.slidesContainer.scrollLeft = this.slideWidth * this.selectedSlide;
    this.updatePagination();
  }

  updatePagination() {
    Array.from(this.paginationItems).forEach((item, index) => {
      item.classList.toggle('active', index === this.selectedSlide);
    });
  }

  selectNextSlide() {
    this.selectedSlide += 1;

    if (this.selectedSlide >= this.amountSlides) {
      this.selectedSlide = 0; // Reset to the first slide
      this.slidesContainer.scrollLeft = 0; // Ensure the container scrolls back to the start
    } else {
      this.slidesContainer.scrollLeft = this.slideWidth * this.selectedSlide;
    }

    this.updatePagination();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newsSlider = new NewsSlider();
  newsSlider.init();
  dispatchEvent(new CustomEvent('NewsSliderLoaded', { detail: { loaded: true } }));
});
