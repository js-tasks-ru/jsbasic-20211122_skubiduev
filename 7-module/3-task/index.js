export default class StepSlider {
  constructor({steps, value = 0}) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    let htmlInsideElem = `<div class="slider__thumb"><span class="slider__value">${value}</span></div><div class="slider__progress"></div><div class="slider__steps">`;

    for (let countSteps = 0; countSteps < steps; countSteps++) {
      let currentStep = '<span';
      if (countSteps === value) {
        currentStep += ' class="slider__step-active"';
      }
      currentStep += '></span>';
      htmlInsideElem += currentStep;
    }

    htmlInsideElem += '</div>';
    this.elem.innerHTML = htmlInsideElem;
    this.elem.querySelector('.slider__thumb').style.left = `${100 / (steps - 1) * value}%`;
    this.elem.querySelector('.slider__progress').style.width = `${100 / (steps - 1) * value}%`;

    this.elem.addEventListener('click', event => {
      const newValue = Math.round((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth * (steps - 1));
      this.elem.querySelector('.slider__value').textContent = `${newValue}`;
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
      this.elem.querySelectorAll('span')[newValue + 1].classList.add('slider__step-active');
      this.elem.querySelector('.slider__thumb').style.left = `${100 / (steps - 1) * newValue}%`;
      this.elem.querySelector('.slider__progress').style.width = `${100 / (steps - 1) * newValue}%`;
      const sliderChangeEvent = new CustomEvent('slider-change', {
        detail: newValue,
        bubbles: true
      });
      this.elem.dispatchEvent(sliderChangeEvent);
    });
  }
}
