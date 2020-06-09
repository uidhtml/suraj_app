import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss'],
})
export class ProductCounterComponent implements OnInit {
  @Input() product;
  @Output() changeProduct = new EventEmitter();
  @Output() addProductToCart = new EventEmitter();

  public isMoreThanStock = false;

  ngOnInit() {
    this.checkOutOfStock();
    if (this.isMoreThanStock) {
      return false;
    }
  }
  showProductCounter() {
    if (this.product.unit === 'g') {
      this.product.quantity += 50;
    } else {
      this.product.quantity++;
    }

    this.checkOutOfStock();
    if (this.isMoreThanStock) {
      return false;
    }
    this.emitProductQuantity();
    this.addProductToCart.emit(this.product);
  }
  add() {
    if (this.product.unit === 'g') {
      this.product.quantity += 50;
    } else {
      this.product.quantity++;
    }
    this.checkOutOfStock();
    if (this.isMoreThanStock) {
      return false;
    }
    this.emitProductQuantity();
  }
  remove() {
    if (this.product.unit === 'g') {
      this.product.quantity -= 50;
    } else {
      this.product.quantity--;
    }
    this.isMoreThanStock = false;
    this.emitProductQuantity();
    if (this.product.quantity <= 0) {
      this.product.addedInCart = false;
      this.addProductToCart.emit(this.product);
    }
  }
  emitProductQuantity() {
    this.changeProduct.emit({
      id: this.product.id,
      quantity: this.product.quantity,
    });
  }

  checkOutOfStock() {
    if (this.product.quantity >= +this.product.stock) {
      this.isMoreThanStock = true;
    } else {
      this.isMoreThanStock = false;
    }
  }
}
