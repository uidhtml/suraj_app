import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { FrontendComponent } from './frontend.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
const routes: Routes = [
  {
    path: '',
    component: FrontendComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/:category',
        component: ProductsComponent,
      },
      {
        path: 'products/:category/:id',
        component: ProductDetailsComponent,
      },
      {
        path: '',
        redirectTo: '/products',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {}
