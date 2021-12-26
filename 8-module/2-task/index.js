import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    let elemInnerHTML = document.createElement('div');
    elemInnerHTML.classList.add('products-grid__inner');

    for (let product of this.products) {
      let newProductCard = new ProductCard(product);
      newProductCard.elem.setAttribute('id', `${product.id}`);
      elemInnerHTML.append(newProductCard.elem);
    }

    this.elem.append(elemInnerHTML);
    this.cloneElem = this.elem.cloneNode(true);
  }

  updateFilter(filters) {
    this.elem.innerHTML = this.cloneElem.innerHTML;
    Object.assign(this.filters, filters);
    let cards = this.elem.querySelector('.products-grid__inner');

    for (let product of this.products) {
      let card = cards.querySelector(`[id="${product.id}"]`);

      if (this.filters.noNuts && product.nuts
        || this.filters.vegeterianOnly && !product.vegeterian
        || !isNaN(this.filters.maxSpiciness) && (product.spiciness > this.filters.maxSpiciness)
        || this.filters.category && (product.category !== this.filters.category)) {
        card.remove();
      }
    }
  }
}
