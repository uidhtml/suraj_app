import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './../core/pages/login/login.component';
import { ForgotPasswordComponent } from './../core/pages/forgot-password/forgot-password.component';
import { AdminComponent } from './admin.component';
import { ROUTE_URLS } from '../route-urls-const';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './../shared/guard/auth.guard';
import { BannerComponent } from './pages/banner/banner.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: ROUTE_URLS.LOGIN, component: LoginComponent },
      { path: ROUTE_URLS.LOGOUT, component: LoginComponent },
      { path: ROUTE_URLS.FORGOT_PASSWORD, component: ForgotPasswordComponent },
      {
        path: ROUTE_URLS.DASHBAORD,
        component: DashboardComponent,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: ROUTE_URLS.PRODUCTS,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: ROUTE_URLS.ORDERS,
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: `${ROUTE_URLS.BANNER}/:status`,
        canActivate: [AuthGuard],
        component: BannerComponent,
      },
      {
        path: `${ROUTE_URLS.BANNER}/:status`,
        canActivate: [AuthGuard],
        component: BannerComponent,
      },
      {
        path: '',
        redirectTo: `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.LOGIN}`,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: `/${ROUTE_URLS.ADMIN}/${ROUTE_URLS.LOGIN}`,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
