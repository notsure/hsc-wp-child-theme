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
    this.addTouchEvents();
    this.addPaginationEvents();
    this.updatePagination();
    this.startAutoSlide();
    this.updateActiveSlide();

    window.addEventListener('resize', this.throttle(() => {
      this.startAutoSlide();  // Restart auto-play when window is resized
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
    this.autoSlideInterval = setInterval(this.nextSlide.bind(this), this.sliderAutoPlayDuration);
  }

  addTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.slidesContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.slidesContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;

      const sensitivity = 50; // Minimum swipe distance
      if (touchEndX + sensitivity < touchStartX) {
        this.nextSlide();
      } else if (touchEndX > touchStartX + sensitivity) {
        this.prevSlide();
      }
    });
  }

  addButtonEventListeners() {
    this.nextButton.addEventListener('click', (e) => this.nextSlide());
    this.prevButton.addEventListener('click', (e) => this.prevSlide());
    this.nextButton.addEventListener('touchend', (e) => {
      e.preventDefault(); // Prevents the mouse click event from firing
      this.nextSlide();
    });

    this.prevButton.addEventListener('touchend', (e) => {
      e.preventDefault(); // Prevents the mouse click event from firing
      this.prevSlide();
    });
  }

  addPaginationEvents() {
    Array.from(this.paginationItems).forEach((item, index) => {
      item.addEventListener('click', () => {
        this.selectSlide(index);
      });
    });
  }

  nextSlide() {
    clearInterval(this.autoSlideInterval);
    this.moveSlideBy(1);
    this.updateSlider();
  }

  prevSlide() {
    clearInterval(this.autoSlideInterval);
    this.moveSlideBy(-1);
    this.updateSlider();
  }

  selectSlide(index) {
    clearInterval(this.autoSlideInterval);
    this.selectedSlide = index;
    this.slidesContainer.scrollLeft = this.slideWidth * index;
    this.updateSlider();
  }

  moveSlideBy(step) {
    this.selectedSlide += step;

    // Wrap-around logic
    if (this.selectedSlide >= this.amountSlides) {
      this.selectedSlide = 0;  // Go to the first slide if we move past the last slide
      this.slidesContainer.scrollLeft = 0;
    } else if (this.selectedSlide < 0) {
      this.selectedSlide = this.amountSlides - 1;  // Go to the last slide if we move before the first slide
    }

    this.slidesContainer.scrollLeft = this.slideWidth * this.selectedSlide;
  }

  updateSlider() {
    this.updateActiveSlide();
    this.updatePagination();
    this.startAutoSlide();  // Restart auto-play
  }

  updatePagination() {
    Array.from(this.paginationItems).forEach((item, index) => {
      item.classList.toggle('active', index === this.selectedSlide);
    });
  }
  updateActiveSlide() {
    Array.from(this.slides).forEach((item, index) => {
      item.classList.toggle('active', index === this.selectedSlide);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newsSlider = new NewsSlider();

  newsSlider.init();
});
