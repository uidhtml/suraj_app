import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { Product } from '../../products/products.interface';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ROUTE_URLS } from '@app/route-urls-const';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  public url: string = '/orders.php';
  public user_id: number = +localStorage.getItem('id');
  public dateArray: string[] = [];
  public products: any = [];
  public totalPurchaseDateWise: number = 0;
  public deliveryStatus: string = 'will be';

  constructor(
    private httpService: HttpService,
    private readonly apiHostService: ApiHostService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        const order_range = params.order_range;
        this.httpService
          .getHttp(
            this.apiHostService.concatUrl(
              `${this.url}?user_id=${this.user_id}&order_range=${order_range}`
            )
          )
          .subscribe((data: { results: Product[] }) => {
            if (data) {
              if (data.results.length > 0) {
                this.products.push(this.groupBy(data.results, 'date'));
                this.totalPurchaseDateWise = Object.keys(data.results).length;
                this.httpService.getAllProducts().subscribe((data) => {
                  this.resetProductsProperties(data);
                });
              }
            }
          });
      }
    });
  }

  resetProductsProperties(data) {
    let categoryArray = Object.keys(data[0]);
    for (let category of categoryArray) {
      for (let product of data[0][category]) {
        if (product.addedInCart === true) {
          delete product['address_id'];
          delete product['user_id'];
          delete product['date'];
          delete product['status'];
          product['addedInCart'] = false;
          product['quantity'] = 0;
        }
      }
    }
  }

  setProductDateArray() {
    for (let product of this.products) {
      this.dateArray.push(product.date);
    }
  }

  groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  productPage(): void {
    this.router.navigate([`${ROUTE_URLS.PRODUCTS}`]);
  }
}
