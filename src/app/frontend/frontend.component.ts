import { Component, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { Product } from './pages/products/products.interface';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss'],
})
export class FrontendComponent implements OnInit {
  private url: string = '/products.php';
  public productsArray = [];
  public results = [];
  public categories: string[] = [];
  constructor(
    private httpService: HttpService,
    private readonly apiHostService: ApiHostService
  ) {}
  ngOnInit() {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}`))
      .subscribe((data: { results: Product[] }) => {
        this.addProductToService(data);
      });

    this.findMe();
  }

  addProductToService(data) {
    if (data && data.results.length > 0) {
      for (let product of data.results) {
        product['quantity'] = 0;
        product['addedInCart'] = false;
        this.categories.push(product.category);
      }
      this.results = data.results;
      this.categories = [...new Set(this.categories)];

      let obj = {};
      for (let product of data.results) {
        const category = product.category;
        if (!obj.hasOwnProperty(category)) {
          let arr = [];
          arr.push(product);
          obj[category] = arr;
        } else {
          obj[category].push(product);
        }
      }
      this.productsArray.push(obj);

      this.httpService.subject.next(this.productsArray);
    }
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {});
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  // var geocoder = new google.maps.Geocoder();
  // var latlng = new google.maps.LatLng(lat, lng);
  // geocoder.geocode({ 'latLng': latlng }, function (results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //           if (results[0]) {
  //             var add = results[0].formatted_address ;
  //           }
  //     }
  // }
}
