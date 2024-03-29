class NewsSlider {
  autoSlideInterval = null;

  init() {
    this.slidesContainer = document.getElementById('hsc--slider-container');

    if (!this.slidesContainer) {
      return;
    }

    this.initSlider();
    this.addButtonEventListeners();
    this.addPaginationEvents();
    this.updatePagination();
    this.startAutoSlide();

    window.addEventListener('resize', () => {
      this.startAutoSlide();
      this.initSlider();
    });
  }

  initSlider() {
    this.slidesContainer = document.getElementById('hsc--slider-container');
    this.slides = document.getElementsByClassName('hsc--slide');
    this.slideWidth = this.slides[0].clientWidth;
    this.prevButton = document.getElementById('hsc--slider-arrow-prev');
    this.nextButton = document.getElementById('hsc--slider-arrow-next');
    this.paginationItems = document.getElementsByClassName('hsc--pagination-item');

    console.log('-->', this.paginationItems);

    this.selectedSlide = 0;
    this.amountSlides = this.slides.length;
  }

  startAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.autoSlideInterval = setInterval(() => {
      this.selectNextSlide();
    }, 7000);
  }

  addButtonEventListeners() {
    this.nextButton.addEventListener('click', () => {
      clearInterval(this.autoSlideInterval);
      this.selectNextSlide();
    });

    this.prevButton.addEventListener('click', () => {
      clearInterval(this.autoSlideInterval);
      this.slidesContainer.scrollLeft -= this.slideWidth;
      this.selectedSlide = this.selectedSlide <= 0 ? 0 : this.selectedSlide - 1;
      this.updatePagination();
    });
  }

  addPaginationEvents() {
    Array.from(this.paginationItems).forEach((item) => {
      item.addEventListener('click', () => {
        clearInterval(this.autoSlideInterval);
        this.selectedSlide = item.dataset.index || 0;
        this.slidesContainer.scrollLeft = this.slideWidth * this.selectedSlide;
        this.updatePagination();
      });
    });
  }

  updatePagination() {
    Array.from(this.paginationItems).forEach((item) => item.classList.remove('active'));
    this.paginationItems[this.selectedSlide].classList.add('active');
  }

  selectNextSlide() {
    this.slidesContainer.scrollLeft += this.slideWidth;
    this.selectedSlide = this.selectedSlide + 1;

    if (this.selectedSlide >= this.amountSlides) {
      this.slidesContainer.scrollLeft = 0;
      this.selectedSlide = 0;
    }

    this.updatePagination();
  }
}

dispatchEvent(new CustomEvent('NewsSliderLoaded', { detail: { loaded: true }}));
