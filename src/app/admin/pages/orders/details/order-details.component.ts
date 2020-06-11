import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/utility/dialog/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '@shared/utility/dialog/info-dialog/info-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTE_URLS } from '@app/route-urls-const';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  public orders = [];
  constructor(
    private httpService: HttpService,
    private apiHostService: ApiHostService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private location: Location
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
              }
            }
          },
          (error) => {
            alert(error.error.text);
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

  orderAction(ref: string, id: number) {
    if (ref && id) {
      this.confirmDelete(
        -1,
        'Are you sure you want to close this order?',
        ' Please make sure that payment has been done for this order?',
        'confirm'
      );
    } else {
      this.router.navigate([`/admin/${ROUTE_URLS.ORDERS}/details/${ref}`]);
    }
  }

  confirmDelete(
    success: number,
    title: string,
    msg: string,
    type?: string,
    status?: number,
    error?: {}[]
  ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: 'auto',
      data: { success, title, msg, type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.closeOrder();
      }
    });
  }

  closeOrder() {
    let formdata = new FormData();
    formdata.append('id', `${this.orders[0].id}`);
    formdata.append('ref', this.orders[0].order_ref_code);
    this.httpService
      .postHttp(this.apiHostService.concatUrl('/delivered-order.php'), formdata)
      .subscribe(
        (response: { success: number; msg: string }) => {
          this.openDialog(1, 'Haxxix says: Successfull!!', response.msg);
        },
        (error) => {
          this.openDialog(-1, 'Haxxix says: Error!!', error.error.text);
        }
      );
  }

  openDialog(
    success: number,
    title: string,
    msg: string,
    status?: number,
    error?: {}[]
  ): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate([`/admin/${ROUTE_URLS.ORDERS}/all`]);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
