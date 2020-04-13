import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss'],
})
export class PaymentModeComponent implements OnInit {
  private url: string = '/place-order.php';
  public isLoaderVisible: boolean = true;
  public userId: number = null;
  public addressId: number = null;
  private productIncart: number = 0;
  public orderArray = [];

  constructor(
    private location: Location,
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoaderVisible = false;
    this.userId = +localStorage.getItem('id');
    this.getAddressId();
    console.log('hello i m payment page');

    this.httpService.getAllProducts().subscribe((data) => {
      if (data && data.length > 0) {
        let categoryArray = Object.keys(data[0]);
        for (let category of categoryArray) {
          for (let product of data[0][category]) {
            if (product.addedInCart === true) {
              this.productIncart++;
            }
          }
        }
      }

      if (this.productIncart === 0) {
        this.router.navigate([`/${ROUTE_URLS.PRODUCTS}`]);
      }
    });
  }

  selectPaymentMode($event, mode) {
    this.isLoaderVisible = true;
    const childrenHTMLcollection = $event.currentTarget.parentNode.children;
    for (let children of childrenHTMLcollection) {
      children.classList.remove('active');
    }
    $event.currentTarget.classList.add('active');
    this.setOrderData();
  }

  getAddressId() {
    this.httpService.delivaryAddressId.subscribe((id) => {
      this.addressId = id;
    });
  }

  setOrderData() {
    this.httpService.getAllProducts().subscribe((data) => {
      console.log(data);
      let categoryArray = Object.keys(data[0]);
      for (let category of categoryArray) {
        for (let product of data[0][category]) {
          if (product.addedInCart === true) {
            product['user_id'] = this.userId;
            product['address_id'] = this.addressId;
            const date = new Date();
            product['date'] = date;
            product['status'] = 0;
            console.log(product);
            this.orderArray.push(product);
          }
        }
      }
      this.placeOrder();
    });
  }

  placeOrder() {
    let formData = new FormData();
    const orderString = JSON.stringify(this.orderArray);
    formData.append('orders', orderString);
    this.httpService
      .postHttp(this.apiHostService.concatUrl(`${this.url}`), formData)
      .subscribe((response: { success: number; msg: string }) => {
        console.log(response);
        this.isLoaderVisible = false;
        if (response.success === 1) {
          console.log(`/${ROUTE_URLS.USER}/${ROUTE_URLS.ORDERS}/latest`);
          this.httpService.getAllProducts().subscribe((data) => {
            console.log(this.orderArray);
          });
          this.router.navigate([
            `/${ROUTE_URLS.USER}/${ROUTE_URLS.ORDERS}/latest`,
          ]);
        }
      });
  }

  goBack() {
    this.location.back();
  }
}
