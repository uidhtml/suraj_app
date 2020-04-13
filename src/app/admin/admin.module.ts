import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from './../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    CoreModule
  ]
})
export class AdminModule {}
