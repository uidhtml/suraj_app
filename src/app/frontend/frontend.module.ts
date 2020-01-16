import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';

@NgModule({
  declarations: [FrontendComponent],
  imports: [FrontendRoutingModule, SharedModule],
  exports: [FrontendComponent]
})
export class FrontendModule {}
