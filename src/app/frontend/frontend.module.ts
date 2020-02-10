import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [FrontendComponent, CartComponent],
  imports: [FrontendRoutingModule, SharedModule, CoreModule],
  exports: [FrontendComponent, CartComponent]
})
export class FrontendModule {}
