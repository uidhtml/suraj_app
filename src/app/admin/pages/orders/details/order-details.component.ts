import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  public orders = [];
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private readonly apiHostService: ApiHostService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const orderId = params.id;
      this.httpService
        .getHttp(
          this.apiHostService.concatUrl(
            `/admin-order-list-details.php?orderId=${orderId}`
          )
        )
        .subscribe(
          (data: { results }) => {
            if (data) {
              if (data.results.length > 0) {
                this.orders = data.results;
                console.log(data);
              }
            }
          },
          (error) => {
            console.log(error.error.text);
          }
        );
    });
  }

  getTotalAmount(): number {
    let totalAmount = 0;
    for (let product of this.orders) {
      totalAmount += product.quantity * product.price;
    }
    return totalAmount;
  }

  goBack(): void {
    this.location.back();
  }
}
