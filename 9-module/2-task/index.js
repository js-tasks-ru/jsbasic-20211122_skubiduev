import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    // ... ваш код
    let carousel = new Carousel(slides),
      ribbonMenu = new RibbonMenu(categories),
      stepSlider = new StepSlider({steps: 5, value: 3}),
      cartIcon = new CartIcon,
      cart = new Cart(cartIcon),
      products = await fetch('products.json').then(result => result.json()),
      productsGrid = new ProductsGrid(products),
      dataProductsGridHolder = document.querySelector('[data-products-grid-holder]'),
      nutsCheckbox = document.querySelector('#nuts-checkbox'),
      vegeterianCheckbox = document.querySelector('#vegeterian-checkbox');

    document.querySelector('[data-carousel-holder]').append(carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);
    dataProductsGridHolder.innerHTML = '';
    dataProductsGridHolder.append(productsGrid.elem);
    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.categories[0].id
    });
    document.body.addEventListener('product-add', event => {
      for (let product of products) {
        if (event.detail === product.id) {
          cart.addProduct(product);
        }
      }
    });
    stepSlider.elem.addEventListener('slider-change', event => {
      productsGrid.updateFilter({maxSpiciness: event.detail});
    });
    ribbonMenu.elem.addEventListener('ribbon-select', event => {
      productsGrid.updateFilter({category: event.detail});
    });
    nutsCheckbox.addEventListener('change', () => productsGrid.updateFilter({noNuts: nutsCheckbox.checked}));
    vegeterianCheckbox.addEventListener('change', () => productsGrid.updateFilter({vegeterianOnly: vegeterianCheckbox.checked}));
  }
}
