import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { ProductCardComponent } from './utility/card/product-card/product-card.component';
import { HeroBannerComponent } from './component/hero-banner/hero-banner.component';
import { ProductCounterComponent } from './component/product-counter/product-counter.component';
import { CategoryListComponent } from './component/category-list/category-list.component';
import { DataTableComponent } from './utility/data-table/data-table.component';
import { EditorJsComponent } from './utility/editor-js/editor-js.component';
import { DialogComponent } from './utility/dialog/dialog.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './utility/loader/loader.component';

const projectSharedComponent = [
  ProductCardComponent,
  HeroBannerComponent,
  ProductCounterComponent,
  CategoryListComponent,
  DataTableComponent,
  EditorJsComponent,
  DialogComponent,
  LoaderComponent,
];
const projectSharedModule = [CommonModule, MaterialModule, RouterModule];

@NgModule({
  declarations: [...projectSharedComponent],
  imports: [...projectSharedModule],
  entryComponents: [DialogComponent],
  exports: [...projectSharedModule, ...projectSharedComponent],
})
export class SharedModule {}
