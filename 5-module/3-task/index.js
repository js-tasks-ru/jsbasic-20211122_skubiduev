function initCarousel() {
  // ваш код...
  const carouselArrowLeft = document.querySelector('.carousel__arrow_left'),
    carouselArrowRight = document.querySelector('.carousel__arrow_right'),
    carouselInner = document.querySelector('.carousel__inner'),
    carouselSlideWidth = document.querySelector('.carousel__slide').offsetWidth;

  let carouselInnerPosition = 0;

  carouselArrowLeft.style.display = 'none';

  carouselArrowLeft.addEventListener('click', function () {
    carouselInner.style.transform = `translateX(${carouselInnerPosition + carouselSlideWidth}px)`;
    updateCarouselInnerPosition();
    if (!carouselInnerPosition) {
      this.style.display = 'none';
    }
    carouselArrowRight.style.display = '';
  });

  carouselArrowRight.addEventListener('click', function () {
    carouselInner.style.transform = `translateX(${carouselInnerPosition - carouselSlideWidth}px)`;
    updateCarouselInnerPosition();
    if (carouselInnerPosition === -carouselSlideWidth * 3) {
      this.style.display = 'none';
    }
    carouselArrowLeft.style.display = '';
  });

  function updateCarouselInnerPosition() {
    carouselInnerPosition = +carouselInner
      .style
      .transform
      .split('translateX(')
      .join('')
      .split('px)')[0];
  }
}
