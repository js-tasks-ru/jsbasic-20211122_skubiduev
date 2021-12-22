import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    let htmlInsideRibbon = '<button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button><nav class="ribbon__inner">';

    for (let categorie of categories) {
      htmlInsideRibbon += `<a href="#" class="ribbon__item" data-id="${categorie.id}">${categorie.name}</a>`;
    }
    htmlInsideRibbon += '</nav><button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>';
    this.elem.innerHTML = htmlInsideRibbon;
    this.elem.querySelector('a').classList.add('ribbon__item_active');

    const ribbonInner = this.elem.querySelector('.ribbon__inner'),
      ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left'),
      ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');

    ribbonArrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });
    ribbonArrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth,
        scrollLeft = ribbonInner.scrollLeft,
        clientWidth = ribbonInner.clientWidth,
        scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (ribbonInner.scrollLeft === 0) {
        ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        ribbonArrowRight.classList.add('ribbon__arrow_visible');
      }
    });

    ribbonInner.addEventListener('click', event => {
      event.preventDefault();
      ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      event.target.classList.add('ribbon__item_active');

      const ribbonSelectEvent = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      });
      event.target.closest('.ribbon').dispatchEvent(ribbonSelectEvent);
    });
  }
}
