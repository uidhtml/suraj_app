import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { SharedModule } from '@shared/shared.module';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [FrontendComponent, ProductsComponent, ProductDetailsComponent],
  imports: [FrontendRoutingModule, CoreModule, SharedModule],
  exports: [FrontendComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class FrontendModule {}
