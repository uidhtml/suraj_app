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
  private addAddressUrl: string = '/add-address.php';
  private setDefaultUrl: string = '/default-address.php';
  private deleteAddressUrl: string = '/delete-address.php';
  public id: string = null;
  public addressArray = [];
  public totalAmount: number = 0;
  public isAddressSelected: boolean = false;
  public isLoaderVisible: boolean = false;
  public pincodes: number[] = [813210, 812001, 812003, 812005];
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
      id: [this.id],
      name: [''],
      country: ['india', [Validators.required]],
      state: ['bihar', [Validators.required]],
      city: ['bhagalpur', [Validators.required]],
      pincode: [null],
      address: [null, [Validators.required]],
      landmark: [null, [Validators.required]],
      defaultAddress: [0],
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

  setDefault(index: number, id) {
    let formData: FormData = new FormData();
    formData.append('id', id);
    formData.append('user_id', this.id);
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.setDefaultUrl), formData)
      .subscribe((response: { success: number; msg: string }) => {
        if (response.success === 1) {
          this.addressArray.forEach((elem) => {
            elem.defaultAddress = 0;
          });
          this.addressArray[index].defaultAddress = 1;
        }
      });
  }

  deleteAddress(index: number, id) {
    let formData: FormData = new FormData();
    formData.append('id', id);
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.deleteAddressUrl), formData)
      .subscribe((response: { success: number; msg: string }) => {
        if (response.success === 1) {
          this.addressArray.splice(index, 1);
        }
      });
  }

  submit($event) {
    let formData: FormData = new FormData();
    Object.keys(this.form.controls).forEach((key) => {
      formData.append(key, this.form.get(key).value);
    });
    this.httpService
      .postHttp(this.apiHostService.concatUrl(this.addAddressUrl), formData)
      .subscribe((response: { success: number; results: any }) => {
        this.addressArray = response.results;
        this.form.reset();
      });
  }

  proceed() {
    this.authService.checkLogin();
    this.router.navigate([`/${ROUTE_URLS.USER}/${ROUTE_URLS.PAYMENTMODE}`]);
  }

  goBack() {
    this.location.back();
  }
}
