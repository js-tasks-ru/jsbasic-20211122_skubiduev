export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
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
    // ваш код
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
    // ваш код
    for (let cartItem of this.cartItems) {
      return false;
    }
    return true;
  }

  getTotalCount() {
    // ваш код
    let totalCount = 0;
    for (let cartItem of this.cartItems) {
      totalCount += cartItem.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    // ваш код
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

