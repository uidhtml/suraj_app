import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontendComponent } from './frontend.component';
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: '', component: FrontendComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule {}
