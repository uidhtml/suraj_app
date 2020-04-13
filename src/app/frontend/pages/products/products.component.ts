import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Product } from './products.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@shared/services/http.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public productsArray = [];
  public results = [];
  public categories: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const category = params.category;
      this.httpService.getAllProducts().subscribe((data) => {
        console.log('products', data);
        if (data) {
          this.categories = [...new Set(Object.keys(data[0]))];
        }
        this.productsArray = [];
        if (data && data[0].hasOwnProperty(category)) {
          const obj = {};
          obj[category] = data[0][category];
          this.productsArray.push(obj);
        } else {
          this.productsArray = data;
        }
      });
    });
  }
}
