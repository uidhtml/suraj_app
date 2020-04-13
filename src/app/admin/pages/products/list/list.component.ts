import { Component, OnInit } from '@angular/core';

import { DataTableElements } from '@shared/utility/data-table/data-table.interface';
import { HttpService } from '@shared/services/http.service';
import { ApiHostService } from '@shared/services/api-host.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public isEmpty: boolean = false;
  public rows: DataTableElements[] = [];
  public header: Array<any> = [
    { name: 'id', label: 'No.' },
    { name: 'name', label: 'Name' },
    { name: 'category', label: 'Category' },
    { name: 'mrp', label: 'MRP' },
    { name: 'price', label: 'Our Price' },
    { name: 'stock', label: 'Stock' }
  ];

  constructor(
    private readonly httpService: HttpService,
    private readonly apiHostService: ApiHostService
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
}
