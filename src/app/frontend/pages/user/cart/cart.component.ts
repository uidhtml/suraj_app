import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { AuthService } from '@shared/services/auth.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public categoryArr = ['fruits', 'vegetables'];
  public totalAmount: number = 0;
  public products: any = [];
  public cartProduct = [];
  public cartProductArray = [];
  public productIncart = 0;
  constructor(
    private location: Location,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.httpService.getAllProducts().subscribe((data) => {
      console.log('cart page product: ', data);
      if (data) {
        const products = data;
        for (let product of products) {
          Object.keys(product).forEach((key) => {
            let obj = {};
            obj[key] = product[key].filter((elem) => {
              return elem.addedInCart === true;
            });
            if (obj[key].length !== 0) {
              this.cartProduct.push(obj);
            }
          });
        }
        this.getTotalAmount();
        let categoryArray = Object.keys(products[0]);
        for (let category of categoryArray) {
          for (let product of products[0][category]) {
            if (product.addedInCart === true) {
              this.productIncart++;
            }
          }
        }
        console.log(this.productIncart);
      }
    });
  }

  productStatus($event) {
    const id = $event.id;
    const quantity = $event.quantity;

    this.products.forEach((elem) => {
      if (elem.id === id) {
        elem.quantity = quantity;
        return false;
      }
    });
    this.getTotalAmount();
  }

  getTotalAmount(): number {
    this.totalAmount = 0;
    for (let product of this.cartProduct) {
      Object.keys(product).forEach((key) => {
        for (let item of product[key]) {
          this.totalAmount += item.quantity * item.price;
        }
      });
    }
    this.httpService.totalAmountSubject.next(this.totalAmount);
    return this.totalAmount;
  }

  goBack(): void {
    this.location.back();
  }

  proceed() {
    this.authService.checkLogin();
    console.log(`/${ROUTE_URLS.USER}/${ROUTE_URLS.SHIPPING}`);
    this.router.navigate([`/${ROUTE_URLS.USER}/${ROUTE_URLS.SHIPPING}`]);
  }
}
