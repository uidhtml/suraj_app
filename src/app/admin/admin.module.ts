import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BannerComponent } from './pages/banner/banner.component';

@NgModule({
  declarations: [AdminComponent, BannerComponent],
  imports: [
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule,
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AdminModule {}
