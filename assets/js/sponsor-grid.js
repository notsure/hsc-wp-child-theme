class SponsorGrid {
  // Define class level constants
  static SLIDE_DURATION = 6000;
  static IMAGE_CHANGE_TIMEOUT = 250; // Base delay time for image change
  static ROOT_ELEMENT_SELECTOR = '.hsc-sponsor-grid';
  static ITEM_SELECTOR = '.hsc-sponsor-grid-item';
  static IMAGE_SELECTOR = '.hsc-sponsor-grid-image';
  static IMAGE_CONTAINER_SELECTOR = '.hsc-sponsor-grid-item-container';
  static PLACEHOLDER_SELECTOR = 'svg';
  static LOADED_CLASS = 'loaded';

  constructor(gridId, itemsPerRow, sponsors) {
    this.gridId = gridId;
    this.itemsPerRow = itemsPerRow;
    this.sponsors = sponsors;
    this.rootElement = document.querySelector(`${SponsorGrid.ROOT_ELEMENT_SELECTOR}[data-id="${this.gridId}"]`);
    this.sponsorGridItems = this.rootElement.querySelectorAll(SponsorGrid.ITEM_SELECTOR);

    if (!this.rootElement || !this.sponsorGridItems.length) {
      console.error("No sponsor grid items found.");

      return;
    }

    this.imageRotationInterval = null;
    this.lastUsedIndices = new Set();

    // Make sure the first logos are assigned directly.
    this.updateImages();

    this.intersectionObserver = this.getIntersectionObserver();
    this.intersectionObserver.observe(this.rootElement);
    this.beforeUnmount();
  }

  getIntersectionObserver() {
    return new IntersectionObserver((entries) => {
      // Assuming there is one root grid element that contains all items
      const [entry] = entries;

      if (entry.isIntersecting) { // Element is in the viewport
        this.startImageRotation();
      } else { // Element is not in the viewport
        this.stopImageRotation();
      }
    });
  }

  startImageRotation() {
    if (this.imageRotationInterval) {
      return; // Prevent multiple intervals
    }

    this.imageRotationInterval = setInterval(() => {
      this.updateImages();
    }, SponsorGrid.SLIDE_DURATION);
  }

  // Method to stop the image rotation
  stopImageRotation() {
    clearInterval(this.imageRotationInterval);
    this.imageRotationInterval = null;
  }

  updateImages() {
    this.sponsorGridItems.forEach((item, index) => {
      let randomSponsor = this.getRandomSponsor();

      const container = item.querySelector(SponsorGrid.IMAGE_CONTAINER_SELECTOR);
      const image = item.querySelector(SponsorGrid.IMAGE_SELECTOR);
      const svg = item.querySelector(SponsorGrid.PLACEHOLDER_SELECTOR);

      if (!image || !container) {
        console.error('Image element not found for item:', item);

        return;
      }

      // Delay each item update by an additional 250ms per index position
      setTimeout(() => {
        // Reset image state for fade effect
        container.classList.remove(SponsorGrid.LOADED_CLASS);

        setTimeout(() => {
          image.style.display = 'block';
          svg.style.display = 'none';

          item.href = randomSponsor.href;
          item.title = randomSponsor.title;
          item.target = '_blank';

          image.src = randomSponsor.src;

          container.classList.add(SponsorGrid.LOADED_CLASS);
        }, 1000); // We need to delay the process so the fade effect is visible for the user.
      }, index * SponsorGrid.IMAGE_CHANGE_TIMEOUT);
    });
  }

  getRandomSponsor() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * this.sponsors.length);
    } while (this.lastUsedIndices.has(randomIndex) && this.sponsors.length > 1);

    if (this.lastUsedIndices.size === this.sponsorGridItems.length) {
      this.lastUsedIndices.delete(this.lastUsedIndices.values().next().value);
    }
    this.lastUsedIndices.add(randomIndex);

    return this.sponsors[randomIndex];
  }

  // Make sure to disconnect the observer when the component is destroyed or no longer needed
  beforeUnmount() {
    window.addEventListener('beforeunload', () => {
      if (this.intersectionObserver) {
        this.intersectionObserver.disconnect();
      }
    });
  }
}
