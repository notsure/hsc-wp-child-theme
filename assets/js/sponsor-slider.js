class SponsorGridAnimated {
  galleryId = '';
  galleryElement = null;
  config = null;
  currentImageIndex = 0;
  mediaAssets = [];

  TRANSITION_TIMEOUT = 1500;
  TRANSITION_MICRO_TIMEOUT = 6;
  TRANSITION_RECALL = 12000;

  TIME_SETS = {
    odd: this.TRANSITION_TIMEOUT * 3,
    even: this.TRANSITION_TIMEOUT * 5
  };

  init(config) {
    this.galleryId = config.galleryId;
    this.config = config;
    this.galleryElement = document.getElementById(this.galleryId);
    this.mediaAssets = this.shuffle(config.mediaAssets);

    this.randomizeImageReplace();
  }

  randomizeImageReplace() {
    const elements = this.galleryElement.getElementsByTagName('a');

    for (let i = 0; i < elements.length; i++) {
      this.animateElement(elements[i], i % 2 ? this.TIME_SETS.odd : this.TIME_SETS.even);
    }
  }

  animateElement(element, timeout) {
    setTimeout(() => {
      this.fadeOut(element);
      setTimeout(() => {
        this.replaceElementContent(element);
        this.fadeIn(element);
      }, this.TRANSITION_TIMEOUT);
      this.animateElement(element, this.TRANSITION_RECALL);
    }, timeout);
  }

  replaceElementContent(element) {
    const nextAsset = this.getNextAsset();
    const images = element.getElementsByTagName('img');

    if (images.length) {
      images[0].src = nextAsset.src;
    }

    element.href = '#';
    element.removeAttribute('target');

    if (!!nextAsset && !!nextAsset.href) {
      element.href = nextAsset.href;
      element.target = '_blank';
    }
  }

  fadeOut(element, duration = this.TRANSITION_TIMEOUT) {
    element.style.display = '';
    element.style.opacity = 1;

    let last = +new Date();
    const tick = function() {
      element.style.opacity = Number(+element.style.opacity - (new Date() - last) / duration).toFixed(4);
      last = +new Date();

      if (-element.style.opacity <= 0) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, this.TRANSITION_MICRO_TIMEOUT);
      } else{
        element.style.opacity = 0;
      }
    };
    tick();
  }

  fadeIn(element, duration = this.TRANSITION_TIMEOUT) {
    element.style.display = '';
    element.style.opacity = 0;

    let last = +new Date();
    const tick = function() {
      element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
      last = +new Date();

      if (+element.style.opacity < 1) {
        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, this.TRANSITION_MICRO_TIMEOUT);
      } else {
        element.style.opacity = 1;
      }
    };
    tick();
  }

  getNextAsset() {
    if (this.currentImageIndex > this.mediaAssets.length) {
      this.currentImageIndex = 0;
    }

    const { currentImageIndex } = this;

    this.currentImageIndex += 1;

    if (this.mediaAssets[currentImageIndex] !== undefined) {
      return this.mediaAssets[currentImageIndex];
    }

    this.currentImageIndex = 0;

    return this.mediaAssets[this.currentImageIndex];
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
};
