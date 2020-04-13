import {
  Component,
  OnChanges,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableElements } from './data-table.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ROUTE_URLS } from '@app/route-urls-const';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges, AfterViewInit {
  @Input() DATA_TABLE_ROWS;
  @Input() DATA_TABLE_HEADER: Array<any>;
  public displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource<DataTableElements>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router) {}

  ngOnChanges() {
    console.log(this.DATA_TABLE_ROWS);
    this.dataSource.data = this.DATA_TABLE_ROWS;
    this.displayedColumns = this.DATA_TABLE_HEADER.map(column => column.name);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  onRowClicked(id, mode) {
    if (mode === 'edit') {
      console.log(id);
      console.log(mode);
      console.log(`/admin/products/${ROUTE_URLS.EDIT}/${id}`);
      this.router.navigate([`/admin/products/${ROUTE_URLS.EDIT}/${id}`]);
    }
    if (mode === 'delete') {
      console.log(id);
      console.log(mode);
      //this.router.navigate([`/admin/post/${ROUTE_URLS.EDIT}/${id}`]);
    }
  }
}