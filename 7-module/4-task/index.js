export default class StepSlider {
  constructor({steps, value = 0}) {
    this.value = value;
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    let htmlInsideElem = `<div class="slider__thumb"><span class="slider__value">${value}</span></div><div class="slider__progress"></div><div class="slider__steps">`,
      currentStepSlider = this.elem;

    for (let countSteps = 0; countSteps < steps; countSteps++) {
      let currentStep = '<span';
      if (countSteps === value) {
        currentStep += ' class="slider__step-active"';
      }
      currentStep += '></span>';
      htmlInsideElem += currentStep;
    }

    htmlInsideElem += '</div>';
    currentStepSlider.innerHTML = htmlInsideElem;

    const thumb = currentStepSlider.querySelector('.slider__thumb'),
      progress = currentStepSlider.querySelector('.slider__progress');
    thumb.ondragstart = () => false;
    thumb.style.left = `${100 / (steps - 1) * value}%`;
    progress.style.width = `${100 / (steps - 1) * value}%`;

    thumb.addEventListener('pointerdown', event => {
      currentStepSlider.classList.add('slider_dragging');
      generateSliderPosition(event);
      document.body.addEventListener('pointermove', listenOfPointerMove);
    });
    document.addEventListener('pointerup', event => {
      if (!currentStepSlider.classList.contains('slider_dragging')) {
        return;
      }
      currentStepSlider.classList.remove('slider_dragging');
      document.body.removeEventListener('pointermove', listenOfPointerMove);
      const sliderChangeEvent = new CustomEvent('slider-change', {
        detail: generateSliderPosition(event),
        bubbles: true
      });
      currentStepSlider.dispatchEvent(sliderChangeEvent);
    });

    currentStepSlider.addEventListener('click', event => {
      const newValue = Math.round((event.clientX - currentStepSlider.getBoundingClientRect().left) / currentStepSlider.offsetWidth * (steps - 1));
      currentStepSlider.querySelector('.slider__value').textContent = `${newValue}`;
      currentStepSlider.querySelector('.slider__step-active').classList.remove('slider__step-active');
      currentStepSlider.querySelectorAll('span')[newValue + 1].classList.add('slider__step-active');
      currentStepSlider.querySelector('.slider__thumb').style.left = `${100 / (steps - 1) * newValue}%`;
      currentStepSlider.querySelector('.slider__progress').style.width = `${100 / (steps - 1) * newValue}%`;
      const sliderChangeEvent = new CustomEvent('slider-change', {
        detail: newValue,
        bubbles: true
      });
      currentStepSlider.dispatchEvent(sliderChangeEvent);
    });

    function generateSliderPosition(event) {
      let leftRelative = (event.clientX - currentStepSlider.getBoundingClientRect().left) / currentStepSlider.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      } else if (leftRelative > 1) {
        leftRelative = 1;
      }
      let newValue = Math.round(leftRelative * (steps - 1));
      currentStepSlider.querySelector('.slider__value').textContent = `${newValue}`;
      currentStepSlider.querySelector('.slider__step-active').classList.remove('slider__step-active');
      currentStepSlider.querySelectorAll('span')[newValue + 1].classList.add('slider__step-active');
      thumb.style.left = `${leftRelative * 100}%`;
      progress.style.width = `${leftRelative * 100}%`;
      return newValue;
    }

    function listenOfPointerMove(event) {
      generateSliderPosition(event);
    }
  }
}
