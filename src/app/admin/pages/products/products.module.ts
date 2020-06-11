import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActiveComponent } from './list/active/active.component';
import { AllComponent } from './list/all/all.component';
import { InactiveComponent } from './list/inactive/inactive.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    AddComponent,
    EditComponent,
    ActiveComponent,
    AllComponent,
    InactiveComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class ProductsModule {}
