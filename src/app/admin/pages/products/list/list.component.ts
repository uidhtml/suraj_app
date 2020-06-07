import { Component, OnInit } from '@angular/core';

import { DataTableElements } from '@shared/utility/data-table/data-table.interface';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@shared/utility/dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly apiHostService: ApiHostService,
    public dialog: MatDialog
  ) {
    if (this.rows.length > 0) {
      for (const item of this.rows) {
        item.stock = item.stock + ' ' + item.unit;
        item.edit = 'edit';
        item.delete = 'delete';
      }
    }
    if (this.header.length > 0) {
      this.header.push(
        { name: 'edit', label: '' },
        { name: 'delete', label: '' }
      );
    }
  }

  ngOnInit() {
    this.httpService
      .getHttp(this.apiHostService.concatUrl('/products.php'))
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
    this.httpService
      .getHttp(
        this.apiHostService.concatUrl(`/delete-product.php?id=${$event.id}`)
      )
      .subscribe(
        (response: { success: number; msg: string }) => {
          console.log(response);
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
      data: { success, title, msg, error },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.rows = this.rows.filter((item) => {
          return item.id !== this.deleteId;
        });
      } else {
        if (status === 0) {
          console.log(status);
        }
      }
    });
  }
}
