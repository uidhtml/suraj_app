import { Component, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http.service';
import { ROUTE_URLS } from '@app/route-urls-const';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  public url: string = '/admin-order-list.php';
  public orders = [];
  constructor(
    private httpService: HttpService,
    private readonly apiHostService: ApiHostService
  ) {}
  ngOnInit(): void {
    this.httpService
      .getHttp(this.apiHostService.concatUrl(`${this.url}`))
      .subscribe((data: { results }) => {
        if (data) {
          if (data.results.length > 0) {
            //this.orders = data.results;
            this.orders.push(this.groupBy(data.results, 'date'));
            console.log(this.orders);
          }
        }
      });
  }

  groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }
}
