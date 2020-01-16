import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatBadgeModule
} from '@angular/material';

const materialItems = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatBadgeModule
];

@NgModule({
  imports: [...materialItems],
  exports: [...materialItems]
})
export class MaterialModule {}
