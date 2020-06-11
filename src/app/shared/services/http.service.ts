import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { Product } from './../../frontend/pages/products/products.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public allProducts = this.subject.asObservable();
  public totalAmountSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(0);
  public totalAmount = this.totalAmountSubject.asObservable();

  public delivaryAddressIdSubject: BehaviorSubject<
    number
  > = new BehaviorSubject<number>(null);
  public delivaryAddressId = this.delivaryAddressIdSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.subject.asObservable();
  }

  login(url: string, data: {}) {
    return this.httpClient.post(url, data);
  }

  uploadImage(url: string, data: FormData) {
    return this.postHttp(url, data);
  }
  getHttp(url: string) {
    if (url) {
      return this.httpClient.get(url);
    }
    //return of(this.products);
  }
  postHttp(url: string, data: FormData) {
    return this.httpClient.post(url, data);
  }
  putHttp(url: string, data: FormData) {
    return this.httpClient.put(url, data);
  }

  getOrders(url: string) {
    //return of(this.orders);
  }
}
