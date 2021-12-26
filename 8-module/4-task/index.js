import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    if (arguments.length === 0 || product === null) {
      return;
    }
    let isProductExist = false,
      updatingCartItem;
    for (let cartItem of this.cartItems) {
      if (product.id === cartItem.product.id) {
        cartItem.count += 1;
        isProductExist = true;
        updatingCartItem = cartItem;
        break;
      }
    }
    if (!isProductExist) {
      this.cartItems.push({
        product: product,
        count: 1
      });
    }
    this.onProductUpdate(updatingCartItem);
  }

  updateProductCount(productId, amount) {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    for (let cartItemIndex of this.cartItems.keys()) {
      if (productId === this.cartItems[cartItemIndex].product.id) {
        this.cartItems[cartItemIndex].count += amount;
        if (this.cartItems[cartItemIndex].count === 0) {
          let cartItem = this.cartItems[cartItemIndex];
          this.cartItems.splice(cartItemIndex, 1);
          this.onProductUpdate(cartItem);
          break;
        }
        this.onProductUpdate(this.cartItems[cartItemIndex]);
      }
    }
  }

  isEmpty() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    for (let cartItem of this.cartItems) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalCount = 0;
    for (let cartItem of this.cartItems) {
      totalCount += cartItem.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // СКОПИРУЙТЕ СЮДЯ СВОЙ КОД
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="../../assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="../../assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="../../assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // ...ваш код
    this.modal = new Modal();
    let order = document.createElement('div');
    this.modal.setTitle('Your order');
    for (let cartItem of this.cartItems) {
      order.append(this.renderProduct(cartItem.product, cartItem.count));
    }
    order.append(this.renderOrderForm());
    this.modal.setBody(order);
    this.modal.open();
    let buttonsMinus = order.querySelectorAll('.cart-counter__button_minus'),
      buttonsPlus = order.querySelectorAll('.cart-counter__button_plus'),
      cartForm = order.querySelector('.cart-form');
    for (let button of buttonsMinus) {
      button.addEventListener('click', () => {
        this.updateProductCount(button.closest('.cart-product').dataset.productId, -1);
      });
    }
    for (let button of buttonsPlus) {
      button.addEventListener('click', () => {
        this.updateProductCount(button.closest('.cart-product').dataset.productId, 1);
      });
    }
    cartForm.addEventListener('submit', event => {
      event.preventDefault();
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    this.cartIcon.update(this);
    if (document.body.classList.contains('is-modal-open') && this.cartItems.length === 0) {
      this.modal.close();
      return;
    } else if (!document.body.classList.contains('is-modal-open')) {
      return;
    }
    if (cartItem.count === 0) {
      this.modal.modal.querySelector(`[data-product-id=${cartItem.product.id}]`).remove();
      return;
    }
    let productId = cartItem.product.id,
      modalBody = this.modal.modal,
      productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`),
      productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`),
      infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    // ...ваш код
    this.modal.modal.querySelector('button[type="submit"]').classList.add('is-loading');
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(this.modal.modal.querySelector('.cart-form'))
    }).then(response => {
      if (response.ok) {
        let newModalBody = document.createElement('div');
        this.modal.setTitle('Success!');
        this.cartItems.length = 0;
        newModalBody.classList.add('modal__body-inner');
        newModalBody.innerHTML = '<p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="/assets/images/delivery.gif"></p>';
        this.modal.setBody(newModalBody);
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

