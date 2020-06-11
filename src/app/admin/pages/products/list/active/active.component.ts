import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableElements } from '@shared/utility/data-table/data-table.interface';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/utility/dialog/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from '@shared/utility/dialog/info-dialog/info-dialog.component';
import { ROUTE_URLS } from '@app/route-urls-const';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss'],
})
export class ActiveComponent implements OnInit {
  public isEmpty: boolean = false;
  public deleteId: number = null;
  public rows: DataTableElements[] = [];
  public header: Array<any> = [
    { name: 'id', label: 'No.' },
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category' },
    { name: 'mrp', label: 'MRP' },
    { name: 'price', label: 'Our Price' },
    { name: 'stock', label: 'Stock' },
    { name: 'status', label: 'Status' },
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly apiHostService: ApiHostService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (this.header.length > 0) {
      this.header.push({ name: 'edit', label: '' });
    }
  }

  ngOnInit() {
    this.httpService
      .getHttp(
        this.apiHostService.concatUrl('/admin-products.php?active=active')
      )
      .subscribe((data: { success: number; results: DataTableElements[] }) => {
        if (data.results.length) {
          this.rows = data.results;
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      });
  }

  productAction($event) {
    this.deleteId = $event.id;
    if ($event.mode === 'delete') {
      this.confirmDelete(
        -1,
        'Are you sure you want to delete?',
        ' Please make sure any order is not pending to deliver?',
        'confirm'
      );
    } else {
      this.router.navigate([`/admin/products/${ROUTE_URLS.EDIT}/${$event.id}`]);
    }
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
      this.rows = this.rows.filter((item) => {
        return item.id !== this.deleteId;
      });
    });
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
        this.deleteProduct();
      }
    });
  }

  deleteProduct() {
    this.httpService
      .getHttp(
        this.apiHostService.concatUrl(`/delete-product.php?id=${this.deleteId}`)
      )
      .subscribe(
        (response: { success: number; msg: string }) => {
          this.openDialog(1, 'Haxxix says: Successfull!!', response.msg);
        },
        (error) => {
          this.openDialog(-1, 'Haxxix says: Error!!', error.error.text);
        }
      );
  }
}
