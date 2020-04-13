import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '@shared/services/auth.service';
import { HttpService } from '@shared/services/http.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { Router } from '@angular/router';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
})
export class ShippingComponent implements OnInit {
  private url: string = '/get-address.php';
  public id: string = null;
  public addressArray = [];
  public totalAmount: number = 0;
  public isAddressSelected: boolean = false;
  public isLoaderVisible: boolean = false;
  public form: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private apiHostService: ApiHostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.isLoaderVisible = true;
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}?id=${this.id}`))
      .subscribe((data: { successfull: number; results: [] }) => {
        console.log(data);
        this.isLoaderVisible = false;
        this.addressArray = data.results;
        for (const address of this.addressArray) {
          if (address.defaultAddress === 1) {
            this.isAddressSelected = true;
            this.httpService.delivaryAddressIdSubject.next(address.id);
            return false;
          }
        }
      });
    this.form = this.formBuilder.group({
      name: [''],
      country: ['india', [Validators.required]],
      state: ['bihar', [Validators.required]],
      city: ['bhagalpur', [Validators.required]],
      pincode: [null],
      address: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      default: [null, [Validators.required]],
    });
    this.httpService.totalAmount.subscribe((amount) => {
      this.totalAmount = amount;
    });
  }

  selectAddress($event, addressId) {
    const childrenHTMLcollection = $event.currentTarget.parentNode.children;
    for (let children of childrenHTMLcollection) {
      children.classList.remove('active');
    }
    $event.currentTarget.classList.add('active');
    this.isAddressSelected = true;
    this.httpService.delivaryAddressIdSubject.next(addressId);
  }

  submit($event) {}

  proceed() {
    this.authService.checkLogin();
    this.router.navigate([`/${ROUTE_URLS.USER}/${ROUTE_URLS.PAYMENTMODE}`]);
  }

  goBack() {
    this.location.back();
  }
}
