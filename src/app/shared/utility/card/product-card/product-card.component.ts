import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnChanges, OnInit {
  @Input() products;
  public categories = [];
  public productType: string;
  public sliceProduct;
  public unitForGram: string;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnChanges() {
    this.categories = Object.keys(this.products);
  }

  ngOnInit() {
    console.log(this.products);
    this.categories.forEach((category) => {
      this.products[category].forEach((product) => {
        if (product.unit === 'g') {
          product.stock = product.stock / 1000;
          if (product.stock >= 1) {
            this.unitForGram = 'kg';
          } else {
            this.unitForGram = 'g';
          }
        }
      });
    });
    this.httpService.getAllProducts().subscribe((products) => {
      this.categories.length > 1
        ? (this.sliceProduct = 3)
        : (this.sliceProduct = products[0].length);
    });
  }

  addProduct($event) {
    const id = $event.id;
    const quantity = $event.quantity;
    Object.keys(this.products).forEach((key) => {
      this.products[key].forEach((elem, index) => {
        if (elem.id === id) {
          elem.quantity = quantity;
          elem.addedInCart = true;
          return false;
        }
      });
    });
  }

  productDeatails($event, product) {
    $event.preventDefault();
    const counterClass = $event.target.classList.contains('counter');
    const quantityClass = $event.target.classList.contains('quantity');
    if (
      $event.target.nodeName !== 'BUTTON' &&
      !counterClass &&
      !quantityClass
    ) {
      this.router.navigate([
        `/${ROUTE_URLS.PRODUCTS}/${product.category}/${product.id}`,
      ]);
    }
  }
}
