import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public subject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public products = [];

  getCartProducts() {
    return this.subject.asObservable();
  }
}
