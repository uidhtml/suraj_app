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

  public products = [
    {
      fruits: [
        {
          id: 1,
          name: 'apple',
          quantity: 0,
          price: 80,
          cutoutPrice: 160,
          unit: 'kg',
          image:
            'https://media.istockphoto.com/photos/red-apple-with-leaf-picture-id683494078?k=6&m=683494078&s=612x612&w=0&h=aVyDhOiTwUZI0NeF_ysdLZkSvDD4JxaJMdWSx2p3pp4=',
          alt: 'apple Pic',
          addedInCart: false,
          inStock: 10,
          date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
          category: 'fruits',
        },
        {
          id: 2,
          name: 'mango',
          quantity: 0,
          price: 40,
          cutoutPrice: 90,
          unit: 'kg',
          image:
            'https://plantogram.com/wa-data/public/shop/products/55/06/655/images/1256/1256.970.jpg',
          alt: 'mango Pic',
          addedInCart: false,
          inStock: 10,
          date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
          category: 'fruits',
        },
      ],
    },
    {
      vegetables: [
        {
          id: 3,
          name: 'Brinjal',
          quantity: 0,
          price: 80,
          cutoutPrice: 160,
          unit: 'kg',
          image:
            'https://www.jagsfresh.com/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/b/r/brinjal_eggplant_-_500_g.jpg',
          alt: 'brinjal Pic',
          addedInCart: false,
          inStock: 10,
          date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
          category: 'vegetable',
        },
        {
          id: 4,
          name: 'potato',
          quantity: 0,
          price: 40,
          cutoutPrice: 90,
          unit: 'kg',
          image:
            'https://images-na.ssl-images-amazon.com/images/I/81459bqY2HL._SX679_.jpg',
          alt: 'potato Pic',
          addedInCart: false,
          inStock: 10,
          date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
          category: 'vegetable',
        },
      ],
    },
  ];

  public orders = [
    {
      id: 1,
      name: 'apple',
      quantity: 2,
      price: 80,
      cutoutPrice: 160,
      unit: 'kg',
      image:
        'https://media.istockphoto.com/photos/red-apple-with-leaf-picture-id683494078?k=6&m=683494078&s=612x612&w=0&h=aVyDhOiTwUZI0NeF_ysdLZkSvDD4JxaJMdWSx2p3pp4=',
      alt: 'apple Pic',
      addedInCart: false,
      inStock: 10,
      category: 'fruits',
      date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
    },
    {
      id: 2,
      name: 'mango',
      quantity: 1,
      price: 40,
      cutoutPrice: 90,
      unit: 'kg',
      image:
        'https://plantogram.com/wa-data/public/shop/products/55/06/655/images/1256/1256.970.jpg',
      alt: 'mango Pic',
      addedInCart: false,
      inStock: 10,
      category: 'fruits',
      date: 'Fri Mar 13 2020 14:29:04 GMT+0530 (India Standard Time)',
    },
  ];

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
    return of(this.products);
  }
  postHttp(url: string, data: FormData) {
    return this.httpClient.post(url, data);
  }
  putHttp(url: string, data: FormData) {
    return this.httpClient.put(url, data);
  }

  getOrders(url: string) {
    return of(this.orders);
  }
}
