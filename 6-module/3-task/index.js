import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    let elemInnerHTML = `<div class="carousel__arrow carousel__arrow_right"><img src="../../assets/images/icons/angle-icon.svg" alt="icon"></div><div class="carousel__arrow carousel__arrow_left"><img src="../../assets/images/icons/angle-left-icon.svg" alt="icon"></div><div class="carousel__inner">`,
      carouselElement = this.elem;

    for (let slide of slides) {
      elemInnerHTML += `<div class="carousel__slide" data-id="${slide.id}"><img src="../../assets/images/carousel/${slide.image}" class="carousel__img" alt="slide"><div class="carousel__caption"><span class="carousel__price">€${slide.price.toFixed(2)}</span><div class="carousel__title">${slide.name}</div><button type="button" class="carousel__button"><img src="../../assets/images/icons/plus-icon.svg" alt="icon"></button></div></div>`;
    }
    this.elem.innerHTML = elemInnerHTML;
    const buttons = this.elem.querySelectorAll('button');
    for (let a = 0; a < buttons.length; a++) {
      buttons[a].addEventListener('click', function () {
        const productAddEvent = new CustomEvent('product-add', {
          detail: slides[a].id,
          bubbles: true
        });
        this.closest('.carousel').dispatchEvent(productAddEvent);
      });
    }

    initCarousel();

    function initCarousel() {
      const carouselArrowLeft = carouselElement.querySelector('.carousel__arrow_left'),
        carouselArrowRight = carouselElement.querySelector('.carousel__arrow_right'),
        carouselInner = carouselElement.querySelector('.carousel__inner'),
        carouselSlide = carouselElement.querySelector('.carousel__slide'),
        numberOfCarouselSlides = carouselElement.querySelectorAll('.carousel__slide').length;

      let carouselInnerPosition = 0;

      carouselElement.querySelector('.carousel__arrow_left').style.display = 'none';

      carouselArrowLeft.addEventListener('click', function () {
        carouselInner.style.transform = `translateX(${carouselInnerPosition + carouselSlide.offsetWidth}px)`;
        updateCarouselInnerPosition();
        if (!carouselInnerPosition) {
          this.style.display = 'none';
        }
        carouselArrowRight.style.display = '';
      });

      carouselArrowRight.addEventListener('click', function () {
        carouselInner.style.transform = `translateX(${carouselInnerPosition - carouselSlide.offsetWidth}px)`;
        updateCarouselInnerPosition();
        if (carouselInnerPosition === -carouselSlide.offsetWidth * (numberOfCarouselSlides - 1)) {
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
  }
}
