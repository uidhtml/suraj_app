import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.scss']
})
export class ProductCounterComponent {
  @Input() product;
  @Output() changeProduct = new EventEmitter();

  public couterStatus: boolean = false;

  showProductCounter() {
    this.product.quantity++;
    this.couterStatus = !this.couterStatus;
    this.emitProductQuantity();
  }
  add() {
    this.product.quantity++;
    this.emitProductQuantity();
  }
  remove() {
    this.product.quantity--;
    this.emitProductQuantity();
    if (this.product.quantity === 0) {
      this.couterStatus = !this.couterStatus;
    }
  }
  emitProductQuantity() {
    this.changeProduct.emit({
      id: this.product.id,
      quantity: this.product.quantity
    });
  }
}
