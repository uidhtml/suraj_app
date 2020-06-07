import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './list/order-list.component';
import { OrderDetailsComponent } from './details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    children: [
      { path: 'all', component: OrderListComponent },
      { path: 'details/:id', component: OrderDetailsComponent },
      { path: '', redirectTo: '/admin/orders/all', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
