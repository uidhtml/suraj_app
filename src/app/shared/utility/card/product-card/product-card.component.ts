import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  public products = [
    {
      id: 1,
      name: 'apple',
      quantity: 0,
      price: 80,
      cutoutPrice: 160,
      unit: 'kg',
      addedInCart: false,
      totalQuantity: '10'
    },
    {
      id: 2,
      name: 'mango',
      quantity: 0,
      price: 40,
      cutoutPrice: 90,
      unit: 'kg',
      addedInCart: false,
      totalQuantity: '10'
    }
  ];

  constructor() {}

  ngOnInit() {}

  productStatus($event) {
    const id = $event.id;
    const quantity = $event.quantity;
    this.products.forEach(elem => {
      if (elem.id === id) {
        elem.quantity = quantity;
      }
    });
  }
}
