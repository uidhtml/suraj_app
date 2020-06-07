import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './list/order-list.component';
import { OrderDetailsComponent } from './details/order-details.component';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent, OrderDetailsComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
