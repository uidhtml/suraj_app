import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss']
})
export class ProductCounterComponent {
  @Input() product;
  @Output() changeProduct = new EventEmitter();
  @Output() addProductToCart = new EventEmitter();

  showProductCounter() {
    this.product.quantity++;
    this.emitProductQuantity();
    this.addProductToCart.emit(this.product);
  }
  add() {
    this.product.quantity++;
    this.emitProductQuantity();
  }
  remove() {
    this.product.quantity--;
    this.emitProductQuantity();
    if (this.product.quantity === 0) {
      this.product.addedInCart = false;
      this.addProductToCart.emit(this.product);
    }
  }
  emitProductQuantity() {
    this.changeProduct.emit({
      id: this.product.id,
      quantity: this.product.quantity
    });
  }
}
